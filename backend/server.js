import express from "express";
import userRoutes from "./Routes/user.route.js";
import explorerRoutes from "./Routes/explorer.route.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome to rest API");
});

app.use("/api/users", userRoutes);
app.use("/api/explorer", explorerRoutes);

app.listen(5000, () => {
  console.log("Server running on 5000");
});
