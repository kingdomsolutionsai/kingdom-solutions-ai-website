import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  sendBrevoEmail,
  formatCapacityLeakAuditEmail,
  formatCapacityLeakAuditParticipantEmail,
  formatClarityProIntakeEmail,
  formatClarityProParticipantEmail,
  formatContactEmail,
} from "./brevo";
import { buildCapacityLeakAuditNotes, fileLeadWithConstance } from "./constance";

const OWNER = { email: "tabitha@kingdomsolutionsai.com", name: "Tabitha Rector" };

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

      // 2. Confirm to the participant that their submission was received.
      //    This previously did not happen at all — the visitor got nothing.
      const participantNotified = await sendBrevoEmail({
        to: { email: input.email, name: `${input.firstName} ${input.lastName}` },
        subject: "Your Capacity Leak Audit™ is on its way",
        htmlContent: formatCapacityLeakAuditParticipantEmail(input),
      });

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

      return { success: true, notified, participantNotified, filedWithConstance };
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
});
