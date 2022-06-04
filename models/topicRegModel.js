const mongoose = require('mongoose');


const topicRegSchema = new mongoose.Schema({
    groupid: {
        type: String

    },
    userid: {
        type: String,
        default: "01"

    },

    topic: {
        type: String,
        default: "01"
    },
    status: {
        type: String,
        default: "Pending"
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
module.exports = mongoose.model('RegisterTopics', topicRegSchema);