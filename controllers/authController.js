const Teacher = require("../models/Teacher")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Login method using Teacher model for testing
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