const mongoose = require('mongoose');


const assignGroupsSchema = new mongoose.Schema({
    name: {
        type: String

    },
    panelname: {
        type: String
    },
    userid: {
        type: String,
        default: "01"
    },
    groupid: {
        type: String,
        default: "01"
    },
     
},
{
      timestamps: true
});
module.exports = mongoose.model('assignGroups', assignGroupsSchema);