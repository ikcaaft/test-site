const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-discord');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 3000;

// Pterodactyl API Configuration
const PTERO_BASE_URL = process.env.PTERO_BASE_URL;
const PTERO_API_KEY = process.env.PTERO_API_KEY;

// Passport Configuration
passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/redirect',
            scope: ['identify', 'guilds'],
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => done(null, profile));
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Middleware
app.use(
    session({
        secret: 'super-secret-key',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/custom-plan', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'custom-plan.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/more', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'more.html'));
});

app.get('/vps', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'vps.html'));
});

app.get('/game-hosting', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

app.get('/web-host', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'web.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/soon', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'soon.html'));
});

app.get('/tos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tos.html'));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));