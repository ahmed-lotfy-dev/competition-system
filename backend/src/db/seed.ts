import { drizzle } from "drizzle-orm/node-postgres"
import {  eq } from "drizzle-orm"
import { Pool } from "pg"
import { committees, questions, answers } from "./schema"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool)

async function seed() {
  console.log("🌱 Seeding example data...")

  // Committees
  const existingCommittees = await db.select().from(committees)
  let frontendCommittee, backendCommittee

  if (existingCommittees.length === 0) {
    const insertedCommittees = await db
      .insert(committees)
      .values([{ name: "Frontend Committee" }, { name: "Backend Committee" }])
      .returning()
    frontendCommittee = insertedCommittees[0]
    backendCommittee = insertedCommittees[1]
    console.log(`✅ ${insertedCommittees.length} committees created`)
  } else {
    frontendCommittee = existingCommittees.find(
      (c) => c.name === "Frontend Committee"
    )
    backendCommittee = existingCommittees.find(
      (c) => c.name === "Backend Committee"
    )
    console.log("ℹ️ Committees already exist")
  }

  // Questions
  const existingQuestions = await db.select().from(questions)
  if (existingQuestions.length === 0) {
    const insertedQuestions = await db
      .insert(questions)
      .values([
        {
          text: "What is React and how does it work?",
        },
        {
          text: "Explain the virtual DOM in React",
        },
        {
          text: "What is REST API?",
        },
        {
          text: "Explain the difference between SQL and NoSQL databases",
        },
      ])
      .returning()
    console.log(`✅ ${insertedQuestions.length} example questions created`)
  } else {
    console.log("ℹ️ Questions already exist")
  }

  console.log("✅ Seeding complete!")
  await pool.end()
}

seed().catch((err) => {
  console.error(err)
  pool.end()
})
