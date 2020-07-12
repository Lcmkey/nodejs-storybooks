const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = require("./../models/User");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

module.exports = async passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        const {
          id,
          displayName,
          name: { givenName: firstName, familyName: lastName },
          photos
        } = profile;

        const newUser = {
          googleId: id,
          displayName: displayName,
          firstName,
          lastName,
          image: photos[0].value
        };

        try {
          let user = await User.findOne({ googleId: id });

          if (user) {
            return done(null, user);
          }

          user = await User.create(newUser);
          done(null, user);
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
