const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

// Create the Express app
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Create SQLite database and table if it doesn't exist
const db = new sqlite3.Database('users.db', (err) => {
    if (err) {
        console.error("Database opening error: ", err);
    } else {
        console.log("Database created/opened");
        // Create users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`);
    }
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission and save data to SQLite
app.post('/signup', (req, res) => {
    const { first_name, email, password } = req.body;

    // Insert the data into the database
    db.run(`INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)`, [first_name, email, password], function (err) {
        if (err) {
            console.error(err.message);
            return res.send('Error while signing up. Please try again.');
        }
        console.log(`User with email ${email} added.`);
        res.send('Signup successful!');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
