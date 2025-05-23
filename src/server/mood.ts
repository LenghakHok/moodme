import {
  validateMoodIdParam,
  validateMoodInsert,
} from "@/core/services/moods/pipes";
import { db } from "@/db";
import { moods, users } from "@/db/schema";
import { typiaValidator } from "@hono/typia-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import type { Env } from "./context";

const app = new Hono<Env>();

app.get("/", async (c) => {
  const lists = await db
    .select()
    .from(moods)
    .leftJoin(users, eq(users.id, moods.userId));

  return c.json(lists);
});

app.get("/me", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  const lists = await db
    .select()
    .from(moods)
    .where(eq(users.id, moods.userId))
    .leftJoin(users, eq(users.id, moods.userId));

  return c.json(lists);
});

app.get(
  "/:id",
  typiaValidator("param", validateMoodIdParam, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: "Bad Request",
          error: result.errors,
        },
        400,
      );
    }
  }),
  async (c) => {
    const param = c.req.valid("param");
    const lists = await db.select().from(moods).where(eq(moods.id, param.id));

    return c.json(lists);
  },
);

app.post(
  "/",
  typiaValidator("json", validateMoodInsert, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: "Bad Request",
          error: result.errors,
        },
        400,
      );
    }
  }),
  async (c) => {
    const body = c.req.valid("json");

    const user = c.get("user");

    if (!user) {
      return c.body(null, 401);
    }

    const mood = await db
      .insert(moods)
      .values({
        ...body,
        userId: user.id,
        date: new Date(body.date),
      })
      .returning();

    return c.json(mood);
  },
);

app.patch(
  "/:id",
  typiaValidator("param", validateMoodIdParam, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: "Bad Request",
          error: result.errors,
        },
        400,
      );
    }
  }),
  typiaValidator("json", validateMoodInsert, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: "Bad Request",
          error: result.errors,
        },
        400,
      );
    }
  }),
  async (c) => {
    const param = c.req.valid("param");
    const body = c.req.valid("json");

    const user = c.get("user");

    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const mood = (
      await db.selectDistinct().from(moods).where(eq(moods.id, param.id))
    ).at(0);

    if (!mood) {
      return c.json(
        {
          message: "Mood does not exist",
        },
        400,
      );
    }

    if (mood.userId !== user.id) {
      return c.json(
        {
          message: "You have no permission to update this data",
        },
        403,
      );
    }

    const data = await db
      .update(moods)
      .set({
        ...body,
        userId: user.id,
        date: new Date(body.date),
      })
      .where(eq(moods.id, param.id))
      .returning();

    return c.json(data);
  },
);

app.delete(
  "/:id",
  typiaValidator("param", validateMoodIdParam, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: "Bad Request",
          error: result.errors,
        },
        400,
      );
    }
  }),
  async (c) => {
    const param = c.req.valid("param");

    const user = c.get("user");

    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const mood = (
      await db.selectDistinct().from(moods).where(eq(moods.id, param.id))
    ).at(0);

    if (!mood) {
      return c.json(
        {
          message: "Mood does not exist",
        },
        400,
      );
    }

    if (mood.userId !== user.id) {
      return c.json(
        {
          message: "You have no permission to update this data",
        },
        403,
      );
    }

    return c.json(
      await db.delete(moods).where(eq(moods.id, param.id)).returning(),
    );
  },
);

export { app as mood };
