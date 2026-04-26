const express = require("express");
const router = express.Router();

const { createStudent, readStudent, readOneStudent } = require("../controllers/studentController");

router.post("/", createStudent);
router.get("/", readStudent)
router.get("/:id", readOneStudent)

module.exports = router;