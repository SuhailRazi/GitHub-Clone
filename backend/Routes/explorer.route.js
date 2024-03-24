import express from "express";
import { explorePopularRepos } from "../controllers/explorer.controller.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/popularRepos/:language", explorePopularRepos);

export default router;
