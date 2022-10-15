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
    u_code:{
        type:String,
    },
    pro_name:{
        type:String,
    },
    pro_id:{
        type:String,
    },
    no_of_students:{
        type:Number,
    },
    no_of_course:{
        type:Number,
    }
});

const Collage = mongoose.model("Collage", collageSchema);
module.exports = Collage;