const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
// const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const googleRoutes = require('./routes/google');


//Use .env file in config folder
require("dotenv").config();

const connectDB = require("./config/database");

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

/**
 * OAuth authentication routes. (Sign in)
 */
//  app.get('/auth/google', 
//  passport.authenticate('google', { scope : ['profile', 'email'] }));

// app.get('/auth/google/callback', 
//  passport.authenticate('google', { failureRedirect: '/error' }),
//  function(req, res) {
//    // Successful authentication, redirect success.
//    res.redirect('/index.ejs');
//  });

//  app.get('/success', (req, res) => res.send(feed.ejs));

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use('/auth', googleRoutes)

//Server Running
app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running, you better catch it!");
});


/*  EXPRESS */



// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET' 
// }));

// app.get('/', function(req, res) {
//   res.render('pages/auth');
// });



// index.js

/*  PASSPORT SETUP  */



// app.get('/success', (req, res) => res.send(userProfile));
// app.get('/error', (req, res) => res.send("error logging in"));

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

/*  Google AUTH  */
 
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const GOOGLE_CLIENT_ID = "49011582156-l0aar1csjtupd65s6rr35k26441fabqt.apps.googleusercontent.com" 
// const GOOGLE_CLIENT_SECRET = "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"
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//       userProfile=profile;
//       return done(null, userProfile);
//   }
// ));
 
// app.get('/auth/google', 
//   passport.authenticate('google', { scope : ['profile', 'email'] }));
 
// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/error' }),
//   function(req, res) {
//     // Successful authentication, redirect success.
//     res.redirect('/success');
//   });

//   app.get('/success', (req, res) => res.send(feed.ejs));