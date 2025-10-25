const url = 'http://localhost:8000';

export const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const imageUrl = `${url}/files/${req.file.filename}`;
        return res.status(200).json({ imageUrl });
    } catch (error) {
        return res.status(500).json({ msg: 'Something went wrong while uploading', error: error.message });
    }
};

export const getImage = (req, res) => {
    const filePath = `uploads/${req.params.filename}`;
    res.sendFile(filePath, { root: '.' }); // Sends file from root/uploads folder
};
