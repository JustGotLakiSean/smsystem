const Student = require("../models/Students");
const bcrypt = require("bcrypt");

exports.createStudent = async (req, res) => {
    try {
        const { name, age, course, year, username, password } = req.body;

        // Basic Validation
        if (!name || !username || !password) {
            return res.status(400).json({ message: "Missing Required Fields" });
        }

        // Check if username already exists
        const existingUser = await Student.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create student
        const student = new Student({
            name,
            age,
            course,
            year,
            username,
            password: hashedPassword,
            subjects: []
        });

        const savedStudent = await student.save();

        res.status(201).json({
            message: "Student created successfully",
            data: savedStudent
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}