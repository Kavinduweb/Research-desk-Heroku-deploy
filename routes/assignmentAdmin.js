const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const assignmentModel = require('../models/assignmentAdminModels');



router.post("/", upload.single('image'), async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)

        let assignment = new assignmentModel({
            
        name: req.body.name,
        aid: req.body.aid,
        userid: req.body.userid,
        description: req.body.description,
        rules: req.body.rules,
        author: req.body.author,
        deadline: req.body.deadline,
        file: result.secure_url,
        cloudinary_id: result.public_id
        })


        await assignment.save()
        res.send(assignment)

        
 
    } catch(err){
        console.log(err)
    }
});


router.get("/", async (req, res) => {
    try {
        let assignment = await assignmentModel.find();
        res.send(assignment);

    
    } catch (err) {
        console.log(err)
    }

});

router.get ("/:id", async (req, res) => {
    try {

        let assignment = await assignmentModel.findById(req.params.id);
     
        res.json(assignment);
    
    } catch (err) {
        console.log(err)
    }
});





router.delete("/:id", async (req, res) => {
    try {

        let assignment = await assignmentModel.findById(req.params.id);
        await cloudinary.uploader.destroy(assignment.cloudinary_id);
        await assignment.remove();
        res.json(assignment);
    
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", upload.single('image'), async (req, res) => {
try {
let assignment = await assignmentModel.findById(req.params.id);
await cloudinary.uploader.destroy(assignment.cloudinary_id);
let result
if(req.file){

result = await cloudinary.uploader.upload(req.file.path);

}
const data = {
    name: req.body.name || assignment.name,
    userid: req.body.userid || assignment.userid,
    aid: req.body.aid || assignment.aid,
    description: req.body.description || assignment.description,
    rules: req.body.rules || assignment.rules,
    author: req.body.author || assignment.author,
    deadline: req.body.deadline || assignment.deadline,
    file: result?.secure_url || assignment.file,
    cloudinary_id: result?.public_id || assignment.cloudinary_id,
};

assignment = await assignmentModel.findByIdAndUpdate(req.params.id, data, {new: true});
res.json(assignment);

}catch (err) {
    console.log(err)
}

})

router.get ("/user/:userid", async (req, res) => {
    try {

        let assignment = await assignmentModel.find({ userid: req.params.userid })
     
        res.json(assignment);
    
    } catch (err) {
        console.log(err)
    }
});





module.exports = router