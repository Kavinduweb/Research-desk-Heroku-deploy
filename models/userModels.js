const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        require: [true, "Please Enter Your Name"],
        trim: true
    },
    email: {
        type: "string",
        require: [true, "Please Enter Your Email"],
        trim: true,
        unique: true

    },
    password: {
        type: "string",
        require: [true, "Please Enter Your Password"]
    },
    role: {
        type: Number,
        default: 0
    },
    roledesc :{
        type:Number,
        default:0
    },
    job:{
        type:String,
        require: [true, "Please Enter Your experties"]
    },
    avatar: {
        type: "string",
        default: "https://res.cloudinary.com/vihanga/image/upload/v1649010992/avatar/149071_jersfv.png"
    }
},
{
    timestamps: true
})


module.exports = mongoose.model("Users",userSchema)