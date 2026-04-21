const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    grade: {
        type: Number,
        default: null
    }
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    course: String,
    year: Number,

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    },

    subjects: [subjectSchema]

}, { timestampts: true });

module.exports = mongoose.model("Student", studentSchema)