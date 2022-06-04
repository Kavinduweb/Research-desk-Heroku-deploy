const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    superid: {
        type: String
    },
    studentid: {
        type: String
    },
    studentname: {
        type: String,
        default: "01"
    },
    supername: {
        type: String,
        default: "01"
    },
    message: {
        type: String,
        default: "01"
    },
     
},
{
      timestamps: true
});
module.exports = mongoose.model('chats', chatSchema);