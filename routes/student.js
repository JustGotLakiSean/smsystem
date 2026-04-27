const express = require("express");
const router = express.Router();

const { 
    createStudent, 
    readStudent, 
    readOneStudent, 
    updateStudent, 
    deactivateStudent,
    reinstateStudent
} = require("../controllers/studentController");

router.post("/", createStudent);
router.get("/", readStudent)
router.get("/:id", readOneStudent)
router.put("/:id", updateStudent)
router.delete("/:id", deactivateStudent)
router.put("/:id/reinstate", reinstateStudent)

module.exports = router;