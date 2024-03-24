import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./db/connectMongoDb.js";
import passport from "passport";
import session from "express-session";

import "./passport/github.auth.js";

import userRoutes from "./Routes/user.route.js";
import explorerRoutes from "./Routes/explorer.route.js";
import authRoutes from "./Routes/auth.route.js";

const app = express();

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome to rest API");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explorer", explorerRoutes);

app.listen(5000, () => {
  console.log("Server running on 5000");
  connectMongoDb();
});
