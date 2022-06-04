const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const User = require('../models/userModels');


router.get('/getallusers', async(req, res) => {
    try{
       const users = await User.find({});
       res.send(users);
    }catch(e){
       return res.status(400).json({message: e});
    }
   
   });






module.exports = router