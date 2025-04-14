import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
// import './auth/google.js'; // Google strategy config
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';



dotenv.config();
const app = express();



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // You can save the user info to a DB here if needed
    return done(null, profile);
}));



// Session middleware
app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serialize/deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Routes
app.get('/', (req, res) => {
    res.send(`<h1>Home</h1><a href="/auth/google">Login with Google</a>`);
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful login
        res.redirect('/profile');
    }
);

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
    res.send(`<h1>Profile</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`);
});

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
