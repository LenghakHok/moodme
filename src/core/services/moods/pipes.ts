import type { moods } from "@/db/schema";
import { createValidate, type tags } from "typia";
import { boolean, date, object, string, type InferInput } from "valibot";

export type MooodSelect = typeof moods.$inferSelect;

export interface MoodIdParamsRequest {
  id: string & tags.Format<"uuid">;
}

export const validateMoodIdParam = createValidate<MoodIdParamsRequest>();

export type MoodInsertRequest = Omit<
  typeof moods.$inferInsert,
  "id" | "userId" | "date"
> & {
  date: string;
};
export const validateMoodInsert = createValidate<MoodInsertRequest>();

export const MoodInsertFormSchema = object({
  label: string(),
  note: string(),
  date: date(),
  emoji: string(),
  isPublic: boolean(),
});

export type MoodInsertSchema = InferInput<typeof MoodInsertFormSchema>;

export const MoodUpdateFormSchema = object({
  id: string(),
  label: string(),
  note: string(),
  date: date(),
  emoji: string(),
});

export type MoodUpdateSchema = InferInput<typeof MoodUpdateFormSchema>;
