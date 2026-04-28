require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

// Middleware
app.use(express.json())

// Routes
const studentRoutes = require("./routes/student");
const authRoutes = require("./routes/auth")

app.use("/api/students", studentRoutes)
app.use("/api/auth", authRoutes)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

app.listen(3000, () => {
    console.log(`Port 3000`)
})