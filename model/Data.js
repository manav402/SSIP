const mongoose = require('mongoose');

const data=new mongoose.Schema({
    name: {
        type:String,
    },
    aadharNumber: {
        type:String,
    },
    university:{
        type:String,
    },
    u_code: {
        type:String,
    },
    program:{
        type:String,
    },
    pro_id:{
        type:String,
    },
    collage:{
        type:String,
    },
    collage_id:{
        type:String,
    },
    year: {
        type:String,
    },
    sem:{
        type:String,
    },
    email:{
        type:String,
    },
    seatNumber: {
        type:String,
    },
    branch:{
        type:String,
    },
    totalSubject:{
        type:Number,
    },
    resultType:{
        type:String,
        default:"college"
    },
    subject:[new mongoose.Schema({
        name:{
            type:String,
        },
        mark:{
            type:Number,
        }
    },{strict:false})],
    acquireMarks:{
        type:Number,
        default:0,
    },
    totalMark:{
        type:Number,
        default:0,
    },
    grade:{
        type:String,
        default:null,
    },
    percentile:{
        type:Number,
        default:null,
    },
    percentage:{
        type:Number,
        default:null,
    },
    currentBack:{
        type:Number,
        default:0,
    },
    totalBack:{
        type:Number,
        default:0,
    },
    spi:{
        type:Number,
        default:0,
    },
    cpi:{   
        type:Number,
        default:0,
    },
    cgpa:{
        type:Number,
        default:0,
    },
},{strict:false});

const Data=mongoose.model('Data',data);

module.exports=Data;
