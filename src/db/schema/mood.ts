import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const moods = pgTable("moods", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id), // foreign key to `profiles.userId`

  date: timestamp("date").unique().notNull().defaultNow(),

  emoji: text("emoji").notNull(), // 😄, 😐, 😞 etc.
  label: text("label"), // e.g. "Tired", "Excited"
  note: text("note"), // optional: short mood description

  isPublic: boolean("is_public").default(true),
  expiresAt: timestamp("expires_at"), // for 24-hour expiry
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
