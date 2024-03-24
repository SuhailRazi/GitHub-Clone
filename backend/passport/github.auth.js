import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GitHubStrategy } from "passport-github2";

dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      //   process.nextTick(function () {
      //     // To keep the example simple, the user's GitHub profile is returned to
      //     // represent the logged-in user.  In a typical application, you would want
      //     // to associate the GitHub account with a user record in your database,
      //     // and return that user instead.
      //     return done(null, profile);
      //   });
      console.log(profile);
    }
  )
);
