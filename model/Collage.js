const mongoose = require('mongoose');

const collageSchema = new mongoose.Schema({
    collage_id:{
        type:String,
    },
    collage_name:{
        type:String,
    },
    collage_short_name:{
        type:String,
    },
    collage_type:{
        type:String,
    },
    collage_code:{
        type:String,
    },
    university:{
        type:String,
    },
    no_of_students:{
        type:Number,
    },
    no_of_course:{
        type:Number,
    },
    courses: [
        new mongoose.Schema({
            courses_name: {
                type:String,
            },
            courses_id:{
                type:String,
            }
        },{strict:false})
    ],
});

const Collage = mongoose.model("Collage", collageSchema);
module.exports = Collage;