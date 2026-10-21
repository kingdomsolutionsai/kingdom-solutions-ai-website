import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { formsRouter } from "./forms";
import { videoExperienceRouter } from "./videoExperience";

export const appRouter = router({
  system: systemRouter,
  forms: formsRouter,
  videoExperience: videoExperienceRouter,
});

export type AppRouter = typeof appRouter;
