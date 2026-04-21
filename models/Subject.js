const mongoose = require("mogoose");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Subject", subjectSchema)