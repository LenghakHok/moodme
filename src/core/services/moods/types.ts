import type { authClient } from "@/core/lib/auth-client";
import type { emotionsEnum } from "@/domains/mood/constants/emotions";
import type { MooodSelect } from "./pipes";

export type Mood = {
  moods: MooodSelect & {
    emoji: keyof typeof emotionsEnum;
  };
  users: typeof authClient.$Infer.Session.user;
};
