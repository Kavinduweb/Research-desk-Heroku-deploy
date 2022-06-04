const mongoose = require('mongoose');


const assignmentAdminSchema = new mongoose.Schema({
    name: {
        type: String

    },
    userid: {
        type: String,
        default: "01"

    },

    aid: {
        type: String,
        default: "01"
    },
    description: {
        type: String,
        default: "No Description"
    },
    rules: {
        type: String,
        default: "No Rules"
    },
    deadline: {
        type: String,
        default: "No Deadline"
    },
    author: {
        type: String,
        default: "admin"
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
module.exports = mongoose.model('assignmentAdmin', assignmentAdminSchema);