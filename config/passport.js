const passport = require('passport');
const User = require('../Model/user.model');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const existingUser = await User.findOne({ username: username });
      if (!existingUser)
        return done(null, false, { message: 'Incorrect username' });

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordMatch)
        return done(null, false, { message: 'Incorrect password' });

      return done(null, existingUser);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const downUser = await User.findById(id);
    done(null, downUser);
  } catch (error) {
    done(error, false);
  }
});
