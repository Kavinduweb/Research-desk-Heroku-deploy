const mongoose = require('mongoose');


const supervisorSelectionSchema = new mongoose.Schema({
    superid: {
        type: String
    },
    studentid: {
        type: String
    },
    groupid: {
        type: String,
        default: "01"
    },
    supername: {
        type: String,
        default: "01"
    },
    studentname: {
        type: String,
        default: "01"
    },
    topic: {
        type: String,
        default: "01"
    },
    description: {
        type: String,
        default: "01"
    },
    approval: {
        type: String,
        default: "Pennding"
    },
     
},
{
      timestamps: true
});
module.exports = mongoose.model('supervisorSelection', supervisorSelectionSchema);