import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar, bigint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Nurture queue — stores scheduled follow-up SMS messages for leads.
 * The /api/scheduled/nurture heartbeat handler runs hourly and sends any due messages.
 *
 * Sequence types:
 *   stem-cell   → 5-step SMS nurture for stem cell prospects (days 1, 2, 3, 5, 7)
 *   black-label → 5-step SMS nurture for Black Label prospects (days 1, 2, 3, 5, 7)
 *   appt-remind → appointment confirmation + 48hr + 2hr reminders
 *   no-show     → post-consultation no-show re-engagement (days 1, 3, 7)
 */
export const nurtureQueue = mysqlTable("nurture_queue", {
  id: int("id").autoincrement().primaryKey(),

  // GHL contact info
  ghlContactId: varchar("ghlContactId", { length: 64 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  firstName: varchar("firstName", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }),

  // Sequence config
  sequenceType: mysqlEnum("sequenceType", ["stem-cell", "black-label", "appt-remind", "no-show"]).notNull(),
  stepNumber: int("stepNumber").notNull().default(1),       // which step in the sequence (1-indexed)
  totalSteps: int("totalSteps").notNull(),                  // total steps in this sequence

  // Scheduling
  sendAt: bigint("sendAt", { mode: "number" }).notNull(),   // UTC ms timestamp — send when Date.now() >= sendAt
  sentAt: bigint("sentAt", { mode: "number" }),             // UTC ms timestamp when actually sent (null = pending)
  failed: boolean("failed").default(false).notNull(),       // true if send failed after retries
  failReason: text("failReason"),

  // Optional context (for appointment reminders)
  appointmentTime: bigint("appointmentTime", { mode: "number" }), // UTC ms of the appointment

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NurtureQueueRow = typeof nurtureQueue.$inferSelect;
export type InsertNurtureQueueRow = typeof nurtureQueue.$inferInsert;
