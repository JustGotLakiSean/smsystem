const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/authMiddleware")

const { 
    createStudent, 
    readStudent, 
    readOneStudent, 
    updateStudent, 
    deactivateStudent,
    reinstateStudent,
    getMe
} = require("../controllers/studentController");

router.post("/", authMiddleware, requireRole("teacher"), createStudent);
router.get("/", authMiddleware, requireRole("teacher"), readStudent)
router.get("/me", authMiddleware, requireRole("student"), getMe)
router.get("/:id", authMiddleware, requireRole("teacher"), readOneStudent)
router.put("/:id", authMiddleware, requireRole("teacher"), updateStudent)
router.delete("/:id", authMiddleware, requireRole("teacher"), deactivateStudent)
router.put("/:id/reinstate", authMiddleware, requireRole("teacher"), reinstateStudent)

module.exports = router;