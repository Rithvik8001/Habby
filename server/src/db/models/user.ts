import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import crypto from "crypto";
import { sql } from "drizzle-orm";

export const usersTable = sqliteTable("users", {
  id: text(`id`)
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userName: text(`user_name`).notNull().unique(),
  email: text(`email`).notNull().unique(),
  password: text(`password`).notNull(),
  createdAt: text(`created_at`)
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text(`updated_at`)
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof usersTable.$inferSelect;
