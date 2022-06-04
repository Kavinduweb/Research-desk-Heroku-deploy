const router = require('express').Router()

const supervisorSelectionModel = require('../models/supervisorSelectionMode');



router.post("/",  async (req, res) => {
    try{

        let supervisorSelection = new supervisorSelectionModel({
            
        studentid: req.body.studentid,
        superid: req.body.superid,
        supername: req.body.supername,
        studentname: req.body.studentname,
        topic: req.body.topic,
        groupid: req.body.groupid,
        description: req.body.description,
        approval: req.body.approval,

      
        })


        await supervisorSelection.save()
        res.send(supervisorSelection)

        
 
    } catch(err){
        console.log(err)
    }
});


router.get("/", async (req, res) => {
    try {
        let supervisorSelection = await supervisorSelectionModel.find();
        res.send(supervisorSelection);

    
    } catch (err) {
        console.log(err)
    }

});

router.get ("/:id", async (req, res) => {
    try {

        let supervisorSelection = await supervisorSelectionModel.findById(req.params.id);
     
        res.json(supervisorSelection);
    
    } catch (err) {
        console.log(err)
    }
});





router.delete("/:id", async (req, res) => {
    try {

        let supervisorSelection = await supervisorSelectionModel.findById(req.params.id);
        await supervisorSelection.remove();
        res.json(supervisorSelection);
    
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", async (req, res) => {
try {
let supervisorSelection = await supervisorSelectionModel.findById(req.params.id);

const data = {
    
    studentid: req.body.studentid || supervisorSelection.studentid,
    superid: req.body.superid || supervisorSelection.superid,
    supername: req.body.supername || supervisorSelection.supername,
    studentname: req.body.studentname || supervisorSelection.studentname,
    groupid: req.body.groupid || supervisorSelection.groupid,
    topic: req.body.topic || supervisorSelection.topic,
    description: req.body.description || supervisorSelection.description,
    approval: req.body.approval || supervisorSelection.approval,
    
};


supervisorSelection = await supervisorSelectionModel.findByIdAndUpdate(req.params.id, data, {new: true});
res.json(supervisorSelection);

}catch (err) {
    console.log(err)
}

})


router.get ("/user/:studentid", async (req, res) => {
    
    try {

        let supervisorSelection = await supervisorSelectionModel.find({ studentid: req.params.studentid })
     
        res.json(supervisorSelection);
    
    } catch (err) {
        console.log(err)
    }
});

router.get ("/super/:superid", async (req, res) => {
    
    try {

        let supervisorSelection = await supervisorSelectionModel.find({ superid: req.params.superid })
     
        res.json(supervisorSelection);
    
    } catch (err) {
        console.log(err)
    }
});








module.exports = router