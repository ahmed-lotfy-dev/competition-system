import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Routes
import postsRoutes from "./routes/posts.js"
app.use("/api/posts", postsRoutes)

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Express backend is running 🚀" })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
