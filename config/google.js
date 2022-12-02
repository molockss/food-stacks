const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose')
const Googleuser = require('../models/Google')
const passport = require('passport');


module.exports = function (passport) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: '49011582156-l0aar1csjtupd65s6rr35k26441fabqt.apps.googleusercontent.com ',
          clientSecret: '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',
          callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
          const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
          }
  
          try {
            let user = await User.findOne({ googleId: profile.id })
  
            if (user) {
              done(null, user)
            } else {
              user = await User.create(newUser)
              done(null, user)
            }
          } catch (err) {
            console.error(err)
          }
        }
      )
    )
  
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
  
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user))
    })
  }
  