import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save with a unique name
    }
});


const upload = multer({
    storage: storage
});




export default upload;
