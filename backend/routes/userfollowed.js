import { Router } from "express";
import { ProtectAuth } from "../middlewares/auth.js";
import {
  followFollowingFriendCount,
  followUser,
  followFollowingFriendCountDetails,
} from "../controllers/userfollow.js";

const router = Router();

router.post("/following/:otherUserId", ProtectAuth, followUser);
router.post("/count", ProtectAuth, followFollowingFriendCount);
router.post("/details", ProtectAuth, followFollowingFriendCountDetails);

export default router;
