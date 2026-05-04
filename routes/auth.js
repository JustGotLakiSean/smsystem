const express = require("express");
const router = express.Router();

const { 
    loginTeacher, 
    loginStudent 
} = require("../controllers/authController");

router.post("/login", loginTeacher)
router.post("/student-login", loginStudent)

module.exports = router;