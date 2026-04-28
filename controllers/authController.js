const Student = require("../models/Students")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Login method using student model for testing
exports.loginTeacher = async ( req, res ) => {
    try {

        // Get username and password
        const { username, password } = req.body;

        // Validate field
        if(!username || !password) {
            return res.status(400).json({ message: "Missing Required Field" });
        }

        // Find username
        const student = await Login.findOne({ username })
        const comparePassword = bcrypt.compare(password, studentPassword)
        if(!student) {
            return res.status(404).json({ message: "Username not found" })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, student.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong Password" })
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: student._id, role: "student" },
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