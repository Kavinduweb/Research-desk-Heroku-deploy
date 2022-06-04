const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    userid: {
        type: String,
        default: "01"
    },
    student_id1: {
        type: String,
        required: true
    },
    student_id2: {
        type: String,
        required: true
    },
    student_id3: {
        type: String,
        required: true
    },
    student_id4: {
        type: String,
        required: true
    },
    groupname: {
        type: String,
        required: true
    },
    groupid: {
        type: String,
        default: "Not Assigned"
    },
});

module.exports = mongoose.model("groupdetails", groupSchema);