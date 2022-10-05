const mongoose = require('mongoose');

const data=new mongoose.Schema({
    name: {
        type:String,
        required:[true,'A user must have a name'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'A user must have an email'],
        unique:true,
    },
    seatNumber: {
        type:Number,
        required:[true,'A user must have a seat number'],
    },
    declaredDate:{
        type:Date, 
    },
    exam:{
        type:String,
    },
    branch:{
        type:String,
    },
    resultType:{
        type:String,
    },
    totalSubject:{
        type:Number,
    },
    subject:[new mongoose.Schema({
        name:{
            type:String,
        },
    },{strict:false})],
    obtainedMarks: [new mongoose.Schema({
        mark:{
            type:Number,
        },
    }, { strict: false })],
    totalMarks: [new mongoose.Schema({
        total:{type: Number,},
    }, { strict: false })],
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
