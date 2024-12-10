const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // 'uploads/' is the directory to store files temporarily

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Brian Yi local server! Now get a JOB!!');
});

// Create a new GET endpoint
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ];
    res.json(users);
});

// Create a POST endpoint
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = Math.floor(Math.random() * 1000); // Assign a random ID
    res.status(201).json({ message: 'User created successfully!', user: newUser });
});

// Create a PUT endpoint
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.json({ message: 'User with ID ${userId} updated!', user: updatedUser });
});

// Create a DELETE endpoint
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: 'User with ID ${userId} deleted!' });
});

// POST endpoint to upload and read a file
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded!' });
    }

    // Full path of the uploaded file
    const filePath = path.join(__dirname, file.path);

    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }

        // Respond with the content of the file
        res.json({ message: 'File read successfully', content: data });

        // Optionally delete the file after reading
        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error('Error deleting file:', unlinkErr);
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
