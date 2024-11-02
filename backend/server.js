// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'db', // Use the service name from your Docker Compose file
    user: 'admin',
    password: 'admin',
    database: 'userdb'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Registration endpoint
app.post('/register', (req, res) => {
    const { name, surname, date_of_birth, gender, interested_in, email, username, password } = req.body;
    const sql = 'INSERT INTO users (name, surname, date_of_birth, gender, interested_in, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, surname, date_of_birth, gender, interested_in, email, username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ success: true, message: 'User registered successfully!' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.status(200).json({ success: true, message: 'Login successful!' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
