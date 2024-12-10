const fileService = require('./fileService');

// Upload and read a file
const uploadFile = async (req, res) => {
    try {
        const fileData = await fileService.saveFile(req.file);
        const fileContent = await fileService.readFile(fileData.path);
        res.status(201).json({ message: 'File uploaded and read successfully', content: fileContent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a file
const deleteFile = async (req, res) => {
    try {
        const filename = req.params.filename;
        await fileService.deleteFile(filename);
        res.json({ message: `File ${filename} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    uploadFile,
    deleteFile,
};
