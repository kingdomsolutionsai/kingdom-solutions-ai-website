import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { formsRouter } from "./forms";

export const appRouter = router({
  system: systemRouter,
  forms: formsRouter,
});

export type AppRouter = typeof appRouter;
