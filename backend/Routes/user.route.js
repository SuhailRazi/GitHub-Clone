import express from "express";
import {
  getUserProfileInfo,
  likeProfile,
} from "../controllers/user.controller.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileInfo);
// TODO -> likes, like a profile (get, Post)

router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router;
