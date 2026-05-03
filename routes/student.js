const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

const { 
    createStudent, 
    readStudent, 
    readOneStudent, 
    updateStudent, 
    deactivateStudent,
    reinstateStudent
} = require("../controllers/studentController");

router.post("/", authMiddleware, createStudent);
router.get("/", authMiddleware, readStudent)
router.get("/:id", authMiddleware, readOneStudent)
router.put("/:id", authMiddleware, updateStudent)
router.delete("/:id", authMiddleware, deactivateStudent)
router.put("/:id/reinstate", authMiddleware, reinstateStudent)

module.exports = router;