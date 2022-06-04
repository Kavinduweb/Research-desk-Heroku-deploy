const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const markingModel = require('../models/markingModel');



router.post("/", upload.single('image'), async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)

        let marking = new markingModel({
            
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        file: result.secure_url,
        cloudinary_id: result.public_id
        })


        await marking.save()
        res.send(marking)

        
 
    } catch(err){
        console.log(err)
    }
});


router.get("/", async (req, res) => {
    try {
        let marking = await markingModel.find();
        res.send(marking);

    
    } catch (err) {
        console.log(err)
    }

});

router.get ("/:id", async (req, res) => {
    try {

        let marking = await markingModel.findById(req.params.id);
     
        res.json(marking);
    
    } catch (err) {
        console.log(err)
    }
});





router.delete("/:id", async (req, res) => {
    try {

        let marking = await markingModel.findById(req.params.id);
        await cloudinary.uploader.destroy(marking.cloudinary_id);
        await marking.remove();
        res.json(marking);
    
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", upload.single('image'), async (req, res) => {
try {
let marking = await markingModel.findById(req.params.id);
await cloudinary.uploader.destroy(marking.cloudinary_id);
let result
if(req.file){

result = await cloudinary.uploader.upload(req.file.path);

}
const data = {
    name: req.body.name || marking.name,
    description: req.body.description || marking.description,
    author: req.body.author || marking.author,
    file: result?.secure_url || marking.file,
    cloudinary_id: result?.public_id || marking.cloudinary_id,
};

marking = await markingModel.findByIdAndUpdate(req.params.id, data, {new: true});
res.json(marking);

}catch (err) {
    console.log(err)
}

})





module.exports = router