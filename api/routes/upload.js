import express from "express";
import { upload } from "../controllers/upload.js";
import { uploadMulter } from "../middleware/multer.js";

const router = express.Router();

router.post("/", uploadMulter.single("file"), upload);

export default router;
