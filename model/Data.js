const mongoose = require('mongoose');

const data=new mongoose.Schema({
    name: {
        type:String,
        required:[true,'A user must have a name'],
        trim:true,
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
        required:[true,'A user must have an email'],
    },
    seatNumber: {
        type:Number,
        required:[true,'A user must have a seat number'],
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
        total:{type: Number,},
    },{strict:false})],
    obtainedGrade:[{
        type:String,
    }],
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
