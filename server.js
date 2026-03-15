// Backend server with intentional security issues
const express = require('express');
const app = express();

// CORS misconfiguration - Wildcard origin allowed
app.use(require('cors')({ origin: '*', credentials: true }));

// Hardcoded secrets
const API_KEY = 'sk-1234567890abcdefghijk';
const DB_PASSWORD = 'admin123password';
const JWT_SECRET = 'default_secret_key';
const DATABASE_URL = 'mongodb+srv://admin:defaultpass123@cluster.mongodb.net';

// Debug endpoint - Exposes environment variables
app.get('/debug', (req, res) => {
    res.json({
        env: process.env,
        NODE_ENV: process.env.NODE_ENV,
        SECRET: process.env.JWT_SECRET
    });
});

// Vulnerable endpoint - NoSQL injection
app.get('/search', (req, res) => {
    const query = req.query.search;
    db.collection('items').find({ name: query }).toArray((err, items) => {
        res.json(items);
    });
});

// XSS vulnerability - innerHTML with user data
app.get('/render', (req, res) => {
    res.send(`<div>${req.query.html}</div>`);
});

// eval() usage - Dynamic code execution
app.post('/execute', (req, res) => {
    const code = req.body.code;
    eval(code);
    res.json({ result: 'executed' });
});

// Sensitive data logging - Passwords in console
app.post('/login', (req, res) => {
    const password = req.body.password;
    console.log('User login password:', password);
    res.json({ token: 'fake-token' });
});

// No rate limiting - Login brute force risk
app.post('/auth/login', (req, res) => {
    res.json({ authenticated: true });
});

// Weak encryption - Hardcoded weak keys
const crypto = require('crypto');
const WEAK_KEY = 'weak-key-123';
const cipher = crypto.createCipher('des', WEAK_KEY);

// Default JWT secret - Weak fallback
const jwt = require('jsonwebtoken');
const token = jwt.sign({ user: 'admin' }, 'secret');

// Large payloads - 50MB limit DoS risk
app.use(express.json({ limit: '50mb' }));

// Vulnerable dependencies - request, eval, old lodash
const request = require('request');
const lodash = require('lodash');  // Old vulnerable version

app.listen(5000);
