import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to rest API");
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
