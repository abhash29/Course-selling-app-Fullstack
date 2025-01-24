const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Course } = require("../db");
const { SECRET, authenticateJwt } = require("../middleware/auth");

const router = express.Router();

// 1. User Signup
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please enter username and password" });
    }

    const user = await User.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "User created successfully", token });
});

// 2. Get all Users
router.get('/', async (req, res) => {
    const users = await User.find({});
    res.json({ users });
});

// 3. User Login -> Not working
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: "Logged in successfully", token });
    } else {
        res.status(403).json({ message: "Invalid username or password" });
    }
});

// 4. Get All Courses
router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

// 5. Purchase a Course
router.post('/courses/:id', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findOne({ username: req.user.username });
    if (!user) {
        return res.status(403).json({ message: "User not found" });
    }

    if (user.purchasedCourses.includes(course._id)) {
        return res.status(400).json({ message: "Course already purchased" });
    }

    user.purchasedCourses.push(course._id);
    await user.save();
    res.json({ message: "Course purchased successfully" });
});

// 6. Get Purchased Courses
router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');

    if (!user) {
        return res.status(403).json({ message: "User not found" });
    }

    res.json({ purchasedCourses: user.purchasedCourses || [] });
});

module.exports = router;
    