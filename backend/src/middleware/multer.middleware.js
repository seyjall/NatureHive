import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(process.cwd(), 'public', 'temp');

    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
 export const upload = multer({ storage: storage })