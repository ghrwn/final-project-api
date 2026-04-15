const express = require("express");
const passport = require("passport");

const router = express.Router();

/*  #swagger.tags = ['Auth']
    #swagger.summary = 'Start Google OAuth login'
*/
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/*  #swagger.tags = ['Auth']
    #swagger.summary = 'Google OAuth callback'
*/
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login-failed"
  }),
  (req, res) => {
    res.redirect("/auth/profile");
  }
);

/*  #swagger.tags = ['Auth']
    #swagger.summary = 'Get current logged in user'
*/
router.get("/profile", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

/*  #swagger.tags = ['Auth']
    #swagger.summary = 'Login failed'
*/
router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "Login failed" });
});

/*  #swagger.tags = ['Auth']
    #swagger.summary = 'Logout current user'
*/
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;