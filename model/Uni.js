const mongoose = require('mongoose');

const uniSchema = new mongoose.Schema({
    u_code: {
        type:String,
    },
    u_name: {
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
    },
    program_name:[
        new mongoose.Schema({
            p_name: {
                type:String,
            },
            pro_id: {
                type: string,
            }            
        },{strict:false})
    ],
});

const Uni = mongoose.model("uni", uniSchema);

module.exports = Uni;