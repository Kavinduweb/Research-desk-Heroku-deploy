const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const studentUpModel = require('../models/studentUpload.Model');



router.post("/", upload.single('image'), async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)

        let studentUp = new studentUpModel({
            
        name: req.body.name,
        userid: req.body.userid,
        createdid :req.body.createdid,
        aid: req.body.aid,
        comments: req.body.comments,
        file: result.secure_url,
        cloudinary_id: result.public_id
        })


        await studentUp.save()
        res.send(studentUp)

        
 
    } catch(err){
        console.log(err)
    }
});


router.get("/", async (req, res) => {
    try {
        let studentUp = await studentUpModel.find();
        res.send(studentUp);

    
    } catch (err) {
        console.log(err)
    }

});

router.get ("/:id", async (req, res) => {
    try {

        let studentUp = await studentUpModel.findById(req.params.id);
     
        res.json(studentUp);
    
    } catch (err) {
        console.log(err)
    }
});





router.delete("/:id", async (req, res) => {
    try {

        let studentUp = await studentUpModel.findById(req.params.id);
        await cloudinary.uploader.destroy(studentUp.cloudinary_id);
        await studentUp.remove();
        res.json(studentUp);
    
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", upload.single('image'), async (req, res) => {
try {
let studentUp = await studentUpModel.findById(req.params.id);
await cloudinary.uploader.destroy(studentUp.cloudinary_id);
let result
if(req.file){

result = await cloudinary.uploader.upload(req.file.path);

}
const data = {
    name: req.body.name || studentUp.name,
    aid: req.body.aid || studentUp.aid,
    createdid: req.body.createdid || studentUp.createdid,
    comments: req.body.comments || studentUp.comments,
    userid: req.body.userid || studentUp.userid,
    file: result?.secure_url || studentUp.file,
    cloudinary_id: result?.public_id || studentUp.cloudinary_id,
};

studentUp = await studentUpModel.findByIdAndUpdate(req.params.id, data, {new: true});
res.json(studentUp);

}catch (err) {
    console.log(err)
}

})

router.post('/getuseruploads', async (req, res) => {
    const {userid} = req.body

    try{
    const studentUp = await studentUpModel.find({userid : userid}).sort({_id : -1})
    res.send(studentUp)

    }catch(e){
        return res.status(400).json({message: e});
    }

})

router.get ("/user/:userid", async (req, res) => {
    try {

        let studentUp = await studentUpModel.find({ userid: req.params.userid })
     
        res.json(studentUp);
    
    } catch (err) {
        console.log(err)
    }
});

router.get ("/user/:createdid", async (req, res) => {
    try {

        let studentUp = await studentUpModel.find({ createdid: req.params.createdid })
     
        res.json(studentUp);
    
    } catch (err) {
        console.log(err)
    }
});










module.exports = router