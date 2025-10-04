import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core"

// Users
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: text("password_hash"), // Managed by Better Auth
  role: varchar("role", { length: 50 }).notNull(), // admin / judge / contestant
  created_at: timestamp("created_at").defaultNow(),
})
// Committees
export const committees = pgTable("committees", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Questions
export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  committeeId: uuid("committee_id").references(() => committees.id),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Answers
export const answers = pgTable("answers", {
  id: uuid("id").defaultRandom().primaryKey(),
  questionId: uuid("question_id").references(() => questions.id),
  userId: uuid("user_id").references(() => users.id),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Judgements
export const judgements = pgTable("judgements", {
  id: uuid("id").defaultRandom().primaryKey(),
  answerId: uuid("answer_id").references(() => answers.id),
  judgeId: uuid("judge_id").references(() => users.id),
  score: integer("score").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
})
