import { Router } from "express";
import multer from "multer";
import { loginUser, registerUser } from "../controllers/user.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/user/avatar");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);

export default router;
