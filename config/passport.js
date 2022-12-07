const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` })
      }
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))

  const GOOGLE_CLIENT_ID = '49011582156-l0aar1csjtupd65s6rr35k26441fabqt.apps.googleusercontent.com'
  const GOOGLE_CLIENT_SECRET ='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'
  
  passport.use(new GoogleStrategy({

  
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://foodstacks.up.railway.app/auth/google/callback",
    //"http://localhost:3000/auth/google/callback" ||
},
async (accessToken, refreshToken, profile, done) => {
   const newUser = {
    googleId: profile.id,
    userName: profile.displayName,
   }

   try {
        let user = await User.findOne({googleId: profile.id})
        console.log(user)
        if(user) {
            done(null, user)
        } else {
            user = await User.create(newUser)
            done(null, user)
        }
   }catch (err) {
        console.error(err)
   }
}
))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
