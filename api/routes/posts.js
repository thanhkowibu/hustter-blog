import express from "express";
import {
  getPosts,
  getaPost,
  addPost,
  deletePost,
  updatePost,
  getRelatedPosts,
} from "../controllers/crud.js";
import { authorizeToken } from "../middleware/authorizeToken.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getaPost);

router.get("/:id/related", getRelatedPosts);

router.post("/", authorizeToken, addPost);

router.delete("/:id", authorizeToken, deletePost);

router.put("/:id", authorizeToken, updatePost);

export default router;
