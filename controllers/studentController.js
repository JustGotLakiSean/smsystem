const Student = require("../models/Students");
const bcrypt = require("bcrypt");

// POST method
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

// get all student
exports.readStudent = async (req, res) => {
    try {

        const students = await Student.find().select("-password"); // retrieve all student with find() and nothing inside

        res.status(200).json({
            message: "Student retrieved successfully",
            data: students
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// get one student
exports.readOneStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select("-password");

        if(!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        res.status(200).json({
            message: "Student retrieved successfully",
            data: student
        })


    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// update student
exports.updateStudent = async (req, res) => {
    try {
        const { name, course, year } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name, course, year },
            { new: true }
        ).select("-password")

        if(!updatedStudent) {
            return res.status(404).json({ message: "Student not found" })
        }
        
        res.status(200).json({
            message: "Update successful",
            data: updatedStudent
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message})
    }
}

// deactivate student - automatically sets active to false; no need for req.body
exports.deactivateStudent = async (req, res) => {
    try {

        const deactivateStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { active: false },
            { new: true }
        ).select("-password")

        if(!deactivateStudent) {
            return res.status(404).json({ message: "Student not found." })
        }
        
        res.status(200).json({
            message: "Deactivated student",
            data: deactivateStudent
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error",  error: error.message })
    }
}

// reinstate student
exports.reinstateStudent = async (req, res) => {
    try {
        const reinstateStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { active: true },
            { new: true }
        ).select("-password")

        if(!reinstateStudent) {
            return res.status(404).json({ message: "Student not found" })
        }

        res.status(200).json({
            message: "Reinstated student",
            data: reinstateStudent
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}