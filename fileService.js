const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');

// Ensure the 'uploads' directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Save the uploaded file
const saveFile = async (file) => {
    if (!file) {
        throw new Error('No file uploaded');
    }
    const filePath = path.join(uploadDir, file.filename);
    return { filename: file.filename, path: filePath };
};

// Read a file
const readFile = async (filePath) => {
    if (!fs.existsSync(filePath)) {
        throw new Error('File not found');
    }
    return fs.promises.readFile(filePath, 'utf8'); // Read file content
};

// Delete a file
const deleteFile = async (filename) => {
    const filePath = path.join(uploadDir, filename);
    if (!fs.existsSync(filePath)) {
        throw new Error('File not found');
    }
    await fs.promises.unlink(filePath); // Delete file
};

module.exports = {
    saveFile,
    readFile,
    deleteFile,
};
