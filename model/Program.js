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
    university: {
        type: String,
    },
    u_code: {
        type: String,
    }
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;