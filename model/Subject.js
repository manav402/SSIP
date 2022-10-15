const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
  u_code: {
    type: String,
  },
  university: {
    type: String,
  },
  pro_name: {
    type: String,
  },
  pro_id: {
    type: String,
  },
  collage_name: {
    type: String,
  },
  collage_id: {
    type: String,
  },
  branch_name: {
    type: String,
  },
  branch_id: {
    type: String,
  },
  subject_name: {
    type: String,
  },
  subject_id: {
    type: String,
  },
  subject_short_name: {
    type: String,
  },
  sem: {
    type: Number,
  },
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject
