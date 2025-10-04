import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import { fromNodeHeaders, toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth"

dotenv.config()

const app = express()

const server = http.createServer(app)

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins for dev, restrict in prod
    methods: ["GET", "POST"],
  },
})

// Better-auth Setup
// app.all("/api/auth/*", toNodeHandler(auth)) //For ExpressJS v4
app.all("/api/auth/*splat", toNodeHandler(auth)) // For ExpressJS v5

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
)

app.use(morgan("dev"))
app.use(express.json())

// Routes
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })
  return res.json(session)
})

app.get("/", (req, res) => {
  res.send("Competition system backend (TS) 🚀")
})

// Socket Listener
io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`)

  socket.on("new-answer", (data) => {
    console.log("New answer received:", data)
    socket.broadcast.emit("answer-updated", data)
  })

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
