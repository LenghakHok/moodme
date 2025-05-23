import type { moods } from "@/db/schema";
import { createValidate, type tags } from "typia";

export interface MoodIdParamsRequest {
  id: string & tags.Format<"uuid">;
}

export const validateMoodIdParam = createValidate<MoodIdParamsRequest>();

export type MoodInsertRequest = Omit<
  typeof moods.$inferInsert,
  "id" | "userId"
> & {};
export const validateMoodInsert = createValidate<MoodInsertRequest>();
