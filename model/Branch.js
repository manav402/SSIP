const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    collage_id: {
        type: String,
    },
    branch_id: {
        type: String,
    },
    branch_name: {
        type: String,
    },
    branch_short_name: {
        type: String,
    },
    pro_name: {
        type: String,
    },
    pro_id: {
        type: String,
    },
    university: {
        type: String,
    },
    u_code: {
        type: String,
    },
    no_of_students: {
        type: Number,
    },
    no_of_subjects: {
        type: Number,
    }
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;