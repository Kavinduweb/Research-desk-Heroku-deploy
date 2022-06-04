const mongoose = require('mongoose');


const studentUploadSchema = new mongoose.Schema({
    name: {
        type: String

    },
    userid: {
        type: String,
        default: "01"
    },
    createdid :{
        type: String,
        default: "01"
    },
    aid: {
        type: String,
        default: "01"
    },
    comments: {
        type: String,
        default: "No Comments"
    },   
    file:{
        type:String,
        default: "https://res.cloudinary.com/vihanga/image/upload/v1649010992/avatar/149071_jersfv.png"
    },
    cloudinary_id:{
        type:String,
    }, 
},
{
      timestamps: true
});
module.exports = mongoose.model('studentAssignments', studentUploadSchema);