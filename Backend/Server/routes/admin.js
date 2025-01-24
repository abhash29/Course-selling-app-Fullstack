const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Course, Admin } = require("../db");
const { SECRET, authenticateJwt } = require("../middleware/auth");

const router = express.Router();

// Admin Signup
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (admin) {
        return res.status(400).json({ message: "Admin already exists" });
    } else {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        const token = jwt.sign({ username, role: "admin" }, SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "Admin created successfully", token });
    }
});

// Admin Profile
router.get("/me", authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (admin) {
        res.json({ username: admin.username });
    } else {
        res.status(404).json({ message: "Admin not found" });
    }
});

// Get all Admins
router.get("/", async (req, res) => {
    const admins = await Admin.find({});
    res.json({ admins });
});

// Admin Login -> Not working
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });

    if (admin) {
        const token = jwt.sign({ username, role: "admin" }, SECRET, {
            expiresIn: "1h",
        });
        res.json({ message: "Login successful", token });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add a Course
router.post("/course", authenticateJwt, async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(200).json({ message: "Course added successfully" });
});

// Get All Courses
router.get("/courses", async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

// Update a Course
router.put("/course/:id", authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if (course) {
        res.status(200).json({ message: "Course updated successfully" });
    } else {
        res.status(404).json({ message: "Course not found" });
    }
});

// Delete a Course
router.delete("/course/:id", authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (course) {
        res.status(200).json({ message: "Course deleted successfully" });
    } else {
        res.status(404).json({ message: "Course not found" });
    }
});

module.exports = router;
