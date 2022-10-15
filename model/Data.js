const mongoose = require('mongoose');

const data=new mongoose.Schema({
    name: {
        type:String,
    },
    aadharNumber: {
        type:Number,
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
        type:Number,
    },
    sem:{
        type:Number,
    },
    email:{
        type:String,
    },
    seatNumber: {
        type:Number,
    },
    exam:{
        type:String,
    },
    branch:{
        type:String,
    },
    totalSubject:{ 
        type:Number,
    },
    subject:[new mongoose.Schema({
        name:{
            type:String,
        },
        mark:{
            type:Number,
        },
        total:{
            type: Number,
        },
        passing_marks:{
            type:Number,
        },
        grade:{
            type:String,
        }
    },{strict:false})],
    acquireMarks:{
        type:Number,
    },
    totalMark:{
        type:Number,
    },
    grade:{
        type:String,
    },
    percentile:{
        type:Number,
    },
    percentage:{
        type:Number,
    },
    currentBack:{
        type:Number,
    },
    totalBack:{
        type:Number,
    },
    spi:{
        type:Number,
    },
    cpi:{   
        type:Number,
    },
    cgpa:{
        type:Number,
    },
},{strict:false});

const Data=mongoose.model('Data',data);

module.exports=Data;
