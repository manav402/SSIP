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
    program: {
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
    },
    subjects:[
        new mongoose.Schema({
            subject_name:{
                type: String,
            },
            subject_id:{
                type: String,
            },
            subject_short_name:{
                type: String,
            },
            subject_sem:{
                type: String,
            }
        },{strict: false})
    ]
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;