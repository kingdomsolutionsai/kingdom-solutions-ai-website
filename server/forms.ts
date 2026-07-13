import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  sendBrevoEmail,
  formatCapacityLeakAuditEmail,
  formatClarityProIntakeEmail,
  formatContactEmail,
} from "./brevo";

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
      const htmlContent = formatCapacityLeakAuditEmail(input);

      const sent = await sendBrevoEmail({
        subject: "New Capacity Leak Audit Submission",
        htmlContent,
        replyToEmail: input.email,
        replyToName: `${input.firstName} ${input.lastName}`,
      });

      return { success: true, notified: sent };
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
      const htmlContent = formatClarityProIntakeEmail(input);

      const sent = await sendBrevoEmail({
        subject: "New Clarity Pro™ Intake Submission",
        htmlContent,
        replyToEmail: input.email,
        replyToName: input.firstName,
      });

      return { success: true, notified: sent };
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
      const htmlContent = formatContactEmail(input);

      const sent = await sendBrevoEmail({
        subject: "New Kingdom Solutions AI™ Contact Form Submission",
        htmlContent,
        replyToEmail: input.email,
        replyToName: `${input.firstName} ${input.lastName}`,
      });

      return { success: true, notified: sent };
    }),
});
