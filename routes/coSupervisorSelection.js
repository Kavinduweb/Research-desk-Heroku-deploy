const router = require('express').Router()

const coSupervisorSelectionModel = require('../models/coSupervisorSelectionModel');



router.post("/",  async (req, res) => {
    try{

        let coSupervisorSelection = new coSupervisorSelectionModel({
            
        studentid: req.body.studentid,
        superid: req.body.superid,
        supername: req.body.supername,
        studentname: req.body.studentname,
        topic: req.body.topic,
        groupid: req.body.groupid,
        description: req.body.description,
        approval: req.body.approval,

      
        })


        await coSupervisorSelection.save()
        res.send(coSupervisorSelection)

        
 
    } catch(err){
        console.log(err)
    }
});


router.get("/", async (req, res) => {
    try {
        let coSupervisorSelection = await coSupervisorSelectionModel.find();
        res.send(coSupervisorSelection);

    
    } catch (err) {
        console.log(err)
    }

});

router.get ("/:id", async (req, res) => {
    try {

        let coSupervisorSelection = await coSupervisorSelectionModel.findById(req.params.id);
     
        res.json(coSupervisorSelection);
    
    } catch (err) {
        console.log(err)
    }
});





router.delete("/:id", async (req, res) => {
    try {

        let coSupervisorSelection = await coSupervisorSelectionModel.findById(req.params.id);
        await coSupervisorSelection.remove();
        res.json(coSupervisorSelection);
    
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", async (req, res) => {
try {
let coSupervisorSelection = await coSupervisorSelectionModel.findById(req.params.id);

const data = {
    
    studentid: req.body.studentid || coSupervisorSelection.studentid,
    superid: req.body.superid || coSupervisorSelection.superid,
    supername: req.body.supername || coSupervisorSelection.supername,
    studentname: req.body.studentname || coSupervisorSelection.studentname,
    groupid: req.body.groupid || coSupervisorSelection.groupid,
    topic: req.body.topic || coSupervisorSelection.topic,
    description: req.body.description || coSupervisorSelection.description,
    approval: req.body.approval || coSupervisorSelection.approval,
    
};


coSupervisorSelection = await coSupervisorSelectionModel.findByIdAndUpdate(req.params.id, data, {new: true});
res.json(coSupervisorSelection);

}catch (err) {
    console.log(err)
}

})


router.get ("/user/:studentid", async (req, res) => {
    
    try {

        let coSupervisorSelection = await coSupervisorSelectionModel.find({ studentid: req.params.studentid })
     
        res.json(coSupervisorSelection);
    
    } catch (err) {
        console.log(err)
    }
});

router.get ("/super/:superid", async (req, res) => {
    
    try {

        let coSupervisorSelection = await coSupervisorSelectionModel.find({ superid: req.params.superid })
     
        res.json(coSupervisorSelection);
    
    } catch (err) {
        console.log(err)
    }
});








module.exports = router