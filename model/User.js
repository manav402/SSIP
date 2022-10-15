const mongoose = require('mongoose');

const userSchema = {
    name: {
        type:String,
        trim:true,

    },
    DOB: {
        type:String,
    },
    email: {
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
    },
    aadhar: {
        type: String,
        unique: true,
    },
    mobile:{
        type:Number,
        unique:true,
        trim:true,
    },
    gender:{
        type:String,
        trim:true,
    },
    pin:{
        type:String,
        trim:true,
    },
    role:{
        type:String,
        default:'user',
    },
    university_code:{
        type:String,
    }
}

const User=mongoose.model('User',userSchema);
module.exports=User;