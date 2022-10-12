const mongoose = require('mongoose');

const userSchema = {
    name: {
        type:String,
        required:[true,'A user must have a name'],
        trim:true,

    },
    DOB: {
        type:String,
        required:[true,'A user must have a date of birth'],
    },
    email: {
        type:String,
        required:[true,'A user must have an email'],
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
        required:[true,'A user must have a mobile number'],
        unique:true,
        trim:true,
    },
    gender:{
        type:String,
        required:[true,'A user must have a gender'],
        trim:true,
    },
    pin:{
        type:String,
        required:[true,'A user must have a pin'],
        trim:true,
    },
    role:{
        type:String,
        default:'user',
    },
}

const User=mongoose.model('User',userSchema);
module.exports=User;