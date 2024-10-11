import { Router } from "express";
import multer from "multer";
import { ProtectAuth } from "../middlewares/auth.js";
import { createPost, getAllPosts } from "../controllers/post.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/post/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create", ProtectAuth, upload.single("image"), createPost);
router.get("/", ProtectAuth, getAllPosts);
export default router;
