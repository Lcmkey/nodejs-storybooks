module.exports = {
  ensureAuth: async (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/");
  },
  ensureGuest: async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }

    res.redirect("/dashboard");
  }
};
