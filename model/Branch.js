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
    subjects: [
        new mongoose.Schema({
            subject_name: {
                type: String,
            },
            subject_id: {
                type: String,
            },
            main_catagory: [new mongoose.Schema({
                main_catagory_name: {
                    type: String,
                },
                main_catagory_id: {
                    type: String,
                },
                sub_catagory: [new mongoose.Schema({
                    sub_catagory_name: {
                        type: String,
                    },
                    sub_catagory_id: {
                        type: String,
                    },
                    
                }, { strict: false })],
            }, { strict: false })],
        }, { strict: false })
    ],
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;