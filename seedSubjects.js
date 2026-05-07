require('dotenv').config()
const mongoose = require("mongoose")
const Subjects = require("./models/Subject")

const seedSubjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected")

        const subjects = [
            { name: "Math" },
            { name: "Science" },
            { name: "English" },
            { name: "History" },
        ]

        const saveSubjects = await Subjects.insertMany(subjects)
        console.log("Subjects seeded successfully")

    } catch (error) {
        console.log("Error seeding subjects", error.message)
    } finally {
        mongoose.connection.close()
        console.log("Connection closed.")
    }
}

seedSubjects()