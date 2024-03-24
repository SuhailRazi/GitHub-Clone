import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// If login failed, redirect back to the login page
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.CLIENT_BASE_URL,
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

// Logout

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "logged out" });
  });
});

export default router;
