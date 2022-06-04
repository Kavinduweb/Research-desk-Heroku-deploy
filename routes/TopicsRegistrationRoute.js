const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const topicsModel = require('../models/topicRegModel');



router.post("/", upload.single('image'), async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)

        let topicreg = new topicsModel({
            
        
        userid: req.body.userid,
        groupid: req.body.groupid,
        topic: req.body.topic,
        status: req.body.status,
        file: result.secure_url,
        cloudinary_id: result.public_id
        })


        await topicreg.save()
        res.send(topicreg)

        
 
    } catch(err){
        console.log(err)
    }
});


router.get("/", async (req, res) => {
    try {
        let topicreg = await topicsModel.find();
        res.send(topicreg);

    
    } catch (err) {
        console.log(err)
    }

});

router.get ("/:id", async (req, res) => {
    try {

        let topicreg = await topicsModel.findById(req.params.id);
     
        res.json(topicreg);
    
    } catch (err) {
        console.log(err)
    }
});





router.delete("/:id", async (req, res) => {
    try {

        let topicreg = await topicsModel.findById(req.params.id);
        await cloudinary.uploader.destroy(topicreg.cloudinary_id);
        await topicreg.remove();
        res.json(topicreg);
    
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", upload.single('image'), async (req, res) => {
try {
let topicreg = await topicsModel.findById(req.params.id);
await cloudinary.uploader.destroy(topicreg.cloudinary_id);
let result
if(req.file){

result = await cloudinary.uploader.upload(req.file.path);

}
const data = {
    
    userid: req.body.userid || topicreg.userid,
    groupid: req.body.groupid || topicreg.groupid,
    status: req.body.status || topicreg.status,

    
    topic: req.body.topic || topicreg.topic,
    file: result?.secure_url || topicreg.file,
    cloudinary_id: result?.public_id || topicreg.cloudinary_id,
};

topicreg = await topicsModel.findByIdAndUpdate(req.params.id, data, {new: true});
res.json(topicreg);

}catch (err) {
    console.log(err)
}

})

router.get ("/user/:userid", async (req, res) => {
    try {

        let topicreg = await topicsModel.find({ userid: req.params.userid })
     
        res.json(topicreg);
    
    } catch (err) {
        console.log(err)
    }
});





module.exports = router