const express = require('express');
const multer = require('multer');
const fileController = require('./fileController');

const app = express();
const PORT = 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Brian Yi local server! Now get a JOB!!');
});

// User routes
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ];
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = Math.floor(Math.random() * 1000); // Assign a random ID
    res.status(201).json({ message: 'User created successfully!', user: newUser });
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.json({ message: `User with ID ${userId} updated!`, user: updatedUser });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId} deleted!` });
});

// File routes
app.post('/upload', upload.single('file'), fileController.uploadFile);
app.delete('/delete/:filename', fileController.deleteFile);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
