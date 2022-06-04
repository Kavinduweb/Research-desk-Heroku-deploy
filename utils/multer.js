const multer = require('multer')
const path = require('path')


module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext =  path.extname(file.originalname);
            if(ext !== '.pdf' && ext !== '.docx' && ext !== '.doc'&& ext !== '.jpg' && ext !== '.zip') {
                cb(new Error('Only .pdf, .docx and .doc files are allowed'), false)
                return;
            }
    
            cb(null, true);
        },
});
