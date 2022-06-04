const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    studentNumber: {
        type:Number,
        unique:true,
        require:[true,"Student Number Required"]
    },
    name:{
        type:"string",
        require:[true,"Name Is required"]
    },
    email:{
        type:"string",
        unique:true,
        require:[true,"Email Required"]
    },
    password:{
        type:"string",
        require:[true,"Password Required"]
    }

})

module.exports = mongoose.model("Student",studentSchema);
