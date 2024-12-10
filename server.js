const express = require('express');
const app = express();

// Define a port
const PORT = 3000;

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
    res.json({ message: `User with ID ${userId} updated!`, user: updatedUser });
});

// Create a DELETE endpoint
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId} deleted!` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
