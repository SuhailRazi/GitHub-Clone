import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./db/connectMongoDb.js";
import passport from "passport";
import session from "express-session";
import path from "path";

import "./passport/github.auth.js";

import userRoutes from "./Routes/user.route.js";
import explorerRoutes from "./Routes/explorer.route.js";
import authRoutes from "./Routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Deployement process where the backedn and frontend run on same domain
const __dirname = path.resolve();
console.log("dirname", __dirname);

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explorer", explorerRoutes);

// Static routes for frontend

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectMongoDb();
});
