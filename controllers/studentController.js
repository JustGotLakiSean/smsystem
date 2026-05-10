const Student = require("../models/Students");
const Subject = require("../models/Subject")
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

        // Fetch all subjects
        const subjects = await Subject.find()

        // Map subject to correct format
        const subjectList = subjects.map(subject => ({
            subject: subject._id,
            grade: null
        }))

        // Create student
        const student = new Student({
            name,
            age,
            course,
            year,
            username,
            password: hashedPassword,
            subjects: subjectList
        });

        const savedStudent = await student.save();
        const { password: _, ...studentData } = savedStudent.toObject()

        res.status(201).json({
            message: "Student created successfully",
            data: studentData
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// get all student
exports.readStudent = async (req, res) => {
    try {

        const students = await Student.find()
            .select("-password") // retrieve all student with find() and nothing inside
            .populate("subjects.subject")            

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
        const student = await Student.findById(req.params.id)
            .select("-password")
            .populate("subjects.subject")

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

// get data
exports.getMe = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id)
            .select("-password")
            .populate("subjects.subject")

        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        res.status(200).json({
            message: "Data retrieved successfully",
            data: student
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

// update grades
exports.updateGrade = async (req, res) => {
    try {

        const { grades } = req.body;
        const student = await Student.findById(req.params.id).select("-password")

        if(!student) {
            return res.status(404).json({ message: "Student not found" })
        }

        for(const item of grades) {
            await Student.updateOne(
                { _id: student._id },
                { $set: { "subjects.$[elem].grade": item.grade } },
                { arrayFilters: [{ "elem.subject": item.subjectId }] }
            )
        }

        const updatedGrades = await Student.findById(req.params.id)
            .select("-password")
            .populate("subjects.subject")

        res.status(200).json({
            message: "Grades updated",
            data: updatedGrades
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}