import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core"

// ---- Auth Tables (from Better Auth) ----
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash"), // handled by Better Auth
  role: varchar("role", { length: 50 }).notNull().default("contestant"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Sessions
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// ---- App Domain Tables ----

// Committees
export const committees = pgTable("committees", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Questions
export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  committeeId: uuid("committee_id").references(() => committees.id, {
    onDelete: "cascade",
  }),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Answers
export const answers = pgTable("answers", {
  id: uuid("id").defaultRandom().primaryKey(),
  questionId: uuid("question_id").references(() => questions.id, {
    onDelete: "cascade",
  }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Judgements
export const judgements = pgTable("judgements", {
  id: uuid("id").defaultRandom().primaryKey(),
  answerId: uuid("answer_id").references(() => answers.id, {
    onDelete: "cascade",
  }),
  judgeId: uuid("judge_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  score: integer("score").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
})
