const router = require('express').Router()

const assignGroupsModel = require('../models/assignGroupsModel');



router.post("/",  async (req, res) => {
    try{

        let assignGroups = new assignGroupsModel({
            
        name: req.body.name,
        panelname: req.body.panelname,
        userid: req.body.userid,
        groupid: req.body.groupid,
      
        })


        await assignGroups.save()
        res.send(assignGroups)

        
 
    } catch(err){
        console.log(err)
    }
});


router.get("/", async (req, res) => {
    try {
        let assignGroups = await assignGroupsModel.find();
        res.send(assignGroups);

    
    } catch (err) {
        console.log(err)
    }

});

router.get ("/:id", async (req, res) => {
    try {

        let assignGroups = await assignGroupsModel.findById(req.params.id);
     
        res.json(assignGroups);
    
    } catch (err) {
        console.log(err)
    }
});





router.delete("/:id", async (req, res) => {
    try {

        let assignGroups = await assignGroupsModel.findById(req.params.id);
        await assignGroups.remove();
        res.json(assignGroups);
    
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", async (req, res) => {
try {
let assignGroups = await assignGroupsModel.findById(req.params.id);

const data = {
    name: req.body.name || assignGroups.name,
    panelname: req.body.panelname || assignGroups.panelname,
    aid: req.body.aid || assignGroups.aid,
    groupid: req.body.groupid || assignGroups.groupid,
    
};


assignGroups = await assignGroupsModel.findByIdAndUpdate(req.params.id, data, {new: true});
res.json(assignGroups);

}catch (err) {
    console.log(err)
}

})


router.get ("/user/:userid", async (req, res) => {
    
    try {

        let assignGroups = await assignGroupsModel.find({ userid: req.params.userid })
     
        res.json(assignGroups);
    
    } catch (err) {
        console.log(err)
    }
});








module.exports = router