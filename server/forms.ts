import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  sendBrevoEmail,
  formatCapacityLeakAuditEmail,
  formatCapacityLeakAuditParticipantEmail,
  formatCapacityLeakAuditResultsEmail,
  formatClarityProIntakeEmail,
  formatClarityProParticipantEmail,
  formatContactEmail,
} from "./brevo";
import { buildCapacityLeakAuditNotes, fileLeadWithConstance } from "./constance";
import { generateCapacityLeakAudit } from "./llm";

const OWNER = { email: "tabitha@kingdomsolutionsai.com", name: "Tabitha Rector" };

// Public URL of the hosted Handbook PDF (dropped into client/public/assets/).
const HANDBOOK_URL = "https://kingdomsolutionsai.com/assets/handbook.pdf";

export const formsRouter = router({
  submitCapacityLeakAudit: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        role: z.string().optional(),
        company: z.string().optional(),
        challenge: z.string().optional(),
        calendarText: z.string().max(8000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Notify Tabitha (existing behavior)
      const notified = await sendBrevoEmail({
        to: OWNER,
        subject: "New Capacity Leak Audit Submission",
        htmlContent: formatCapacityLeakAuditEmail(input),
        replyToEmail: input.email,
        replyToName: `${input.firstName} ${input.lastName}`,
      });

      // 2. Generate and send the real, personalized audit to the participant.
      //    Falls back to the "24 hours" placeholder only if AI generation
      //    isn't configured yet (LLM_API_KEY / LLM_MODEL not set in Render) —
      //    the form keeps working either way, it just upgrades once the key
      //    is added.
      let participantNotified: boolean;
      let auditGenerated: boolean;
      try {
        const auditText = await generateCapacityLeakAudit(input);
        participantNotified = await sendBrevoEmail({
          to: { email: input.email, name: `${input.firstName} ${input.lastName}` },
          subject: `${input.firstName}, your Capacity Leak Audit™ results`,
          htmlContent: formatCapacityLeakAuditResultsEmail({ firstName: input.firstName, auditText }),
        });
        auditGenerated = true;
      } catch (error) {
        console.warn("[CapacityLeakAudit] Falling back to placeholder email:", error instanceof Error ? error.message : error);
        participantNotified = await sendBrevoEmail({
          to: { email: input.email, name: `${input.firstName} ${input.lastName}` },
          subject: "Your Capacity Leak Audit™ is on its way",
          htmlContent: formatCapacityLeakAuditParticipantEmail(input),
        });
        auditGenerated = false;
      }

      // 3. File the lead into the Notion Pipeline via Constance, reusing the
      //    same webhook the Lead Generator & Qualifier already writes to.
      //    Best-effort: a failure here never blocks the visitor's emails.
      const filedWithConstance = await fileLeadWithConstance({
        name: `${input.firstName} ${input.lastName}`,
        email: input.email,
        source: "Capacity Leak Audit",
        stage: "New Lead",
        notes: buildCapacityLeakAuditNotes(input),
      });

      return { success: true, notified, participantNotified, filedWithConstance, auditGenerated };
    }),

  submitClarityProIntake: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        email: z.string().email(),
        clarityNeed: z.string().optional(),
        background: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const notified = await sendBrevoEmail({
        to: OWNER,
        subject: "New Clarity Pro™ Intake Submission",
        htmlContent: formatClarityProIntakeEmail(input),
        replyToEmail: input.email,
        replyToName: input.firstName,
      });

      const participantNotified = await sendBrevoEmail({
        to: { email: input.email, name: input.firstName },
        subject: "Your clarity journey begins",
        htmlContent: formatClarityProParticipantEmail(input),
      });

      return { success: true, notified, participantNotified };
    }),

  submitContact: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        subject: z.string().min(1),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const notified = await sendBrevoEmail({
        to: OWNER,
        subject: "New Kingdom Solutions AI™ Contact Form Submission",
        htmlContent: formatContactEmail(input),
        replyToEmail: input.email,
        replyToName: `${input.firstName} ${input.lastName}`,
      });

      return { success: true, notified };
    }),

  // ---------------------------------------------------------------------------
  // Handbook download request — free lead magnet for the emerging-entrepreneur
  // lane. Follows the same pattern as the other forms: notify Tabitha, email
  // the visitor their download link, and file the lead into the Notion Pipeline
  // via Constance as source "Handbook" so this audience is segmented in the
  // pipeline. Reuses existing email helpers with inline HTML (no brevo.ts
  // change required) — refine the templates later if desired.
  // ---------------------------------------------------------------------------
  submitHandbookRequest: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Notify Tabitha of the new handbook lead.
      const notified = await sendBrevoEmail({
        to: OWNER,
        subject: "New Handbook Download — Kingdom Solutions AI™",
        htmlContent: `
          <div style="font-family: Georgia, serif; color: #10100f; line-height: 1.6;">
            <h2 style="color: #8c6927;">New Handbook Download</h2>
            <p><strong>Name:</strong> ${input.firstName}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p>Filed to the pipeline as source "Handbook".</p>
          </div>
        `,
        replyToEmail: input.email,
        replyToName: input.firstName,
      });

      // 2. Send the visitor their download link.
      const participantNotified = await sendBrevoEmail({
        to: { email: input.email, name: input.firstName },
        subject: "Your Entrepreneur Handbook is ready",
        htmlContent: `
          <div style="font-family: Georgia, serif; color: #10100f; line-height: 1.7; max-width: 560px; margin: 0 auto;">
            <p style="font-size: 18px;">Hi ${input.firstName},</p>
            <p>Thank you for requesting <em>What Every New Entrepreneur Needs to Know</em>. Here is your copy:</p>
            <p style="text-align: center; margin: 32px 0;">
              <a href="${HANDBOOK_URL}"
                 style="display: inline-block; background: #cda34b; color: #10100f; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; padding: 15px 28px; border-radius: 6px;">
                Download the Handbook
              </a>
            </p>
            <p>This handbook walks you through moving from expertise and vision to a clear, compliant, revenue-ready business — in the right order, without the overwhelm.</p>
            <p style="margin-top: 28px;">When you are ready for what comes next, you can find your current stage and your next right step through our resources at
              <a href="https://kingdomsolutionsai.com" style="color: #8c6927;">kingdomsolutionsai.com</a>.
            </p>
            <p style="margin-top: 28px; color: #6e685f; font-family: Arial, sans-serif; font-size: 13px;">
              Kingdom Solutions AI™<br/>
              Clarity · Alignment · Leverage · Legacy
            </p>
          </div>
        `,
      });

      // 3. File the lead into the Notion Pipeline via Constance. Best-effort:
      //    a failure here never blocks the visitor's download.
      const filedWithConstance = await fileLeadWithConstance({
        name: input.firstName,
        email: input.email,
        source: "Handbook",
        stage: "New Lead",
        notes: "Requested the free Entrepreneur Handbook via the /handbook landing page.",
      });

      return { success: true, notified, participantNotified, filedWithConstance };
    }),
});
