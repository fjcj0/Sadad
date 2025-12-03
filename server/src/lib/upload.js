import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || ".webm";
        cb(null, Date.now() + ext);
    }
});
export const upload = multer({
    storage,
    limits: { fileSize: 25 * 1024 * 1024 }
});