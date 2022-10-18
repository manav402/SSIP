const mongoose = require('mongoose');

const uniSchema = new mongoose.Schema({
    u_code: {
        type:String,
    },
    u_name: {
        type:String,
    },
    u_short_name: {
        type:String,
    },
    u_affilation:{
        type:String,
    },
    vc_name:{
        type:String,
    },
    vc_number:{
        type:Number,
    },
    head_name: {
        type:String,
    },
    head_number:{
        type:Number,
    },
    total_Program:{
        type:Number,
        required:[true,'Please enter the total number of programs'],
    }
});

const Uni = mongoose.model("uni", uniSchema);

module.exports = Uni;