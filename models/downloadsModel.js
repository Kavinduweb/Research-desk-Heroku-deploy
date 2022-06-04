const mongoose = require('mongoose');


const downloadsSchema = new mongoose.Schema({
    name: {
        type: String

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
module.exports = mongoose.model('downloads', downloadsSchema);