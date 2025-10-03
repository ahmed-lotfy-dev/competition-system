import { Router } from "express"
import { getAllPosts } from "../controllers/postsController.js"

const router = Router()

router.get("/", getAllPosts)

export default router
