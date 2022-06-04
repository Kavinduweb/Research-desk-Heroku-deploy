const router = require('express').Router()

const chatModel = require('../models/chatModel');



router.post("/",  async (req, res) => {
    try{

        let chat = new chatModel({
            
        studentid: req.body.studentid,
        superid: req.body.superid,
        studentname: req.body.studentname,
        supername: req.body.supername,
        message: req.body.message,

        })


        await chat.save()
        res.send(chat)

        
 
    } catch(err){
        console.log(err)
    }
});


router.get("/", async (req, res) => {
    try {
        let chat = await chatModel.find();
        res.send(chat);

    
    } catch (err) {
        console.log(err)
    }

});

router.get ("/:id", async (req, res) => {
    try {

        let chat = await chatModel.findById(req.params.id);
     
        res.json(chat);
    
    } catch (err) {
        console.log(err)
    }
});





router.delete("/:id", async (req, res) => {
    try {

        let chat = await chatModel.findById(req.params.id);
        await chat.remove();
        res.json(chat);
    
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", async (req, res) => {
try {
let chat = await chatModel.findById(req.params.id);

const data = {
    
    studentid: req.body.studentid || chat.studentid,
    superid: req.body.superid || chat.superid,
    studentname: req.body.studentname || chat.studentname,
    supername: req.body.supername || chat.supername,
    message: req.body.message || chat.message,
    
};


chat = await chatModel.findByIdAndUpdate(req.params.id, data, {new: true});
res.json(chat);

}catch (err) {
    console.log(err)
}

})


router.get ("/user/:studentid", async (req, res) => {
    
    try {

        let chat = await chatModel.find({ studentid: req.params.studentid })
     
        res.json(chat);
    
    } catch (err) {
        console.log(err)
    }
});

router.get ("/super/:superid", async (req, res) => {
    
    try {

        let chat = await chatModel.find({ superid: req.params.superid })
     
        res.json(chat);
    
    } catch (err) {
        console.log(err)
    }
});








module.exports = router