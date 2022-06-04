const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const downloadsModel = require('../models/downloadsModel');



router.post("/", upload.single('image'), async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)

        let downloads = new downloadsModel({
            
        name: req.body.name,
        author: req.body.author,
        file: result.secure_url,
        cloudinary_id: result.public_id
        })


        await downloads.save()
        res.send(downloads)

        
 
    } catch(err){
        console.log(err)
    }
});


router.get("/", async (req, res) => {
    try {
        let downloads = await downloadsModel.find();
        res.send(downloads);

    
    } catch (err) {
        console.log(err)
    }

});

router.get ("/:id", async (req, res) => {
    try {

        let downloads = await downloadsModel.findById(req.params.id);
     
        res.json(downloads);
    
    } catch (err) {
        console.log(err)
    }
});





router.delete("/:id", async (req, res) => {
    try {

        let downloads = await downloadsModel.findById(req.params.id);
        await cloudinary.uploader.destroy(downloads.cloudinary_id);
        await downloads.remove();
        res.json(downloads);
    
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", upload.single('image'), async (req, res) => {
try {
let downloads = await downloadsModel.findById(req.params.id);
await cloudinary.uploader.destroy(downloads.cloudinary_id);
let result
if(req.file){

result = await cloudinary.uploader.upload(req.file.path);

}
const data = {
    name: req.body.name || downloads.name,
    author: req.body.author || downloads.author,
    file: result?.secure_url || downloads.file,
    cloudinary_id: result?.public_id || downloads.cloudinary_id,
};

downloads = await downloadsModel.findByIdAndUpdate(req.params.id, data, {new: true});
res.json(downloads);

}catch (err) {
    console.log(err)
}

})





module.exports = router