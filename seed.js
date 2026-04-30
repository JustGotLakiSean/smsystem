require('dotenv').config()

const mongoose = require("mongoose")
const Teacher = require("./models/Teacher")
const bcrypt = require("bcrypt")

const seedTeacher = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected")

        // Create Teacher data to seed
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("teacher123", salt)

        const teacher = new Teacher({
            name: "Airha Asinas",
            username: "airha.asinas",
            password: hashedPassword
        })

        const savedTeacher = await teacher.save();
        console.log("Teacher seeded successfully", savedTeacher)

        
    } catch (error) {
        console.log("Error Seeding teacher", error.message)
    } finally {
        mongoose.connection.close()
        console.log("Connection closed")
    }
}

seedTeacher()