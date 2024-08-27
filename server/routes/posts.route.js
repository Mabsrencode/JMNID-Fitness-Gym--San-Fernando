import express from "express";
import {
  postController,
  createPostController,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/post.controller.js";
import auth from "../middleware/auth.middleware.js";
const router = express.Router();
//routes
router.get("/", postController);
router.post("/", auth, createPostController);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
export default router;
