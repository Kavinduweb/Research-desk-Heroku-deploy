const fs = require('fs');



module.exports = async function (req, res, next) {

    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No files were uploaded" });
        }

        const file = req.files.file;

        console.log(file)

        if (file.size > 20 *  1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "size is too large" });
        } //20mb

        
        if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/docx' && file.mimetype !== 'application/doc') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "File fomat is incorrect" });
        }

        next()
         

    }catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}
