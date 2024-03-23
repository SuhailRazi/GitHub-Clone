import express from "express";
import { getUserProfileInfo } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileInfo);
// TODO -> likes, like a profile (get, Post)

export default router;
