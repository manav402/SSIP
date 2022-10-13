const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    pro_id: {
        type: String,
    },
    pro_name: {
        type: String,
    },
    pro_short_name: {
        type: String,
    },
    pro_duration: {
        type: Number,
    },
    pro_total_collages: {
        type: Number,
    },
    collage_name: [
        new mongoose.Schema({
            c_name: {
                type: String,
            },
            collage_id: {
                type: String,
            }
        }, { strict: false })
    ],
    university: {
        type: String,
    },
    u_code: {
        type: String,
    }
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;