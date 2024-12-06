const express = require('express');
const fs = require('fs-extra');
const multer = require('multer');
const path = require('path');
const app = express();

// Set up storage for the uploaded Excel file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store uploaded files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, 'excel (2).xlsx'); // Save the file with the fixed name
    }
});

const upload = multer({ storage: storage });

// Serve the Excel file to the user
app.get('/excel', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', 'excel (2).xlsx');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Excel file not found');
    }
});

// Admin uploads the Excel file
app.post('/update-excel', upload.single('excelFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send('Excel file updated successfully');
});

// Serve static files like HTML, CSS, JS
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
