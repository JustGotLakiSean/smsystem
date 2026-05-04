const Teacher = require("../models/Teacher")
const Student = require("../models/Students")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Login method using Teacher
exports.loginTeacher = async ( req, res ) => {
    try {

        // Get username and password
        const { username, password } = req.body;

        // Validate field
        if(!username || !password) {
            return res.status(400).json({ message: "Missing Required Field" });
        }

        // Find username
        const teacher = await Teacher.findOne({ username })
        if(!teacher) {
            return res.status(404).json({ message: "Username not found" })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, teacher.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong Password" })
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: teacher._id, role: "teacher" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.status(200).json({
            message: "Login successful",
            token
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// Student Login
exports.loginStudent = async (req, res) => {
    try {
        
        // get student's username and password
        const { username, password } = req.body;

        // validate fields
        if(!username || !password) {
            return res.status(400).json({ message: "Missing Required Field" })
        }

        // find student username
        const student = await Student.findOne({ username });
        if(!student) {
            return res.status(404).json({ message: "Username not found." })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, student.password)
        if(!isMatch) {
            return res.status(401).json({ message: "Wrong Password" })
        }

        // generate JWT
        const token = jwt.sign(
            { id: student._id, role: "student" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.status(200).json({
            message: "Login Successful",
            token
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}