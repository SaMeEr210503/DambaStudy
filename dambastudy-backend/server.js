import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());

import User from "./models/User.js";
import Course from "./models/Course.js";
import Category from "./models/Category.js";
import Certificate from "./models/Certificate.js";

import auth from "./middleware/auth.js";
import admin from "./middleware/admin.js";

// ---------- AUTH ----------
app.post("/auth/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });

        if (exists) return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ name, email, password });
        const token = user.generateToken();
        res.json({ message: "Registered successfully", token, user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Registration failed" });
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const ok = await user.comparePassword(password);
        if (!ok) return res.status(400).json({ message: "Invalid credentials" });

        const token = user.generateToken();
        res.json({ token, user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed" });
    }
});

app.get("/auth/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch {
        res.status(500).json({ message: "Failed to get user" });
    }
});

// ---------- CATEGORIES ----------
app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
});

app.post("/admin/categories", auth, admin, async (req, res) => {
    try {
        const cat = await Category.create({ name: req.body.name });
        res.json(cat);
    } catch {
        res.status(500).json({ message: "Failed to create category" });
    }
});

app.delete("/admin/categories/:id", auth, admin, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch {
        res.status(500).json({ message: "Failed to delete" });
    }
});

// ---------- COURSES ----------
app.get("/courses", async (req, res) => {
    try {
        const { category, level, search, sort, page = 1, limit = 12 } = req.query;

        const filter = {};
        if (category) filter["category.name"] = category;
        if (level) filter.level = level;
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        let sortOption = { createdAt: -1 };
        if (sort === "price-low") sortOption = { price: 1 };
        if (sort === "price-high") sortOption = { price: -1 };
        if (sort === "popular") sortOption = { enrolledCount: -1 };
        if (sort === "rating") sortOption = { rating: -1 };

        const courses = await Course.find(filter)
            .populate("category")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Course.countDocuments(filter);

        res.json({ courses, total, page: parseInt(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        console.error("Courses fetch error:", err);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
});

app.get("/courses/popular", async (req, res) => {
    try {
        const courses = await Course.find().sort({ enrolledCount: -1 }).limit(6);
        res.json(courses);
    } catch {
        res.status(500).json({ message: "Failed to fetch popular courses" });
    }
});

app.get("/courses/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("category");
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        console.error("Course fetch error:", err);
        res.status(500).json({ message: "Failed to fetch course" });
    }
});

// Course lessons (for enrolled users)
app.get("/courses/:id/lessons", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ message: "Course not found" });

        // Check if user is enrolled
        const isEnrolled = user.myCourses?.some(c => c.toString() === req.params.id);
        if (!isEnrolled) {
            return res.status(403).json({ message: "Not enrolled in this course" });
        }

        res.json(course.lessons);
    } catch {
        res.status(500).json({ message: "Failed to fetch lessons" });
    }
});

// Get single lesson
app.get("/courses/:courseId/lessons/:lessonId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const course = await Course.findById(req.params.courseId);

        if (!course) return res.status(404).json({ message: "Course not found" });

        const isEnrolled = user.myCourses?.some(c => c.toString() === req.params.courseId);
        if (!isEnrolled) {
            return res.status(403).json({ message: "Not enrolled in this course" });
        }

        const lesson = course.lessons.find(l => l._id.toString() === req.params.lessonId);
        if (!lesson) return res.status(404).json({ message: "Lesson not found" });

        res.json({ lesson, course: { _id: course._id, title: course.title }, lessons: course.lessons });
    } catch {
        res.status(500).json({ message: "Failed to fetch lesson" });
    }
});

app.post("/admin/courses", auth, admin, async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.json(course);
    } catch {
        res.status(500).json({ message: "Failed to create course" });
    }
});

app.put("/admin/courses/:id", auth, admin, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(course);
    } catch {
        res.status(500).json({ message: "Failed to update course" });
    }
});

app.delete("/admin/courses/:id", auth, admin, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch {
        res.status(500).json({ message: "Failed to delete" });
    }
});

// ---------- ENROLLMENT ----------
app.post("/enroll", auth, async (req, res) => {
    try {
        const { courseId } = req.body;

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { myCourses: courseId }
        });

        // Increment enrolled count
        await Course.findByIdAndUpdate(courseId, {
            $inc: { enrolledCount: 1 }
        });

        res.json({ message: "Enrolled successfully" });
    } catch {
        res.status(500).json({ message: "Enrollment failed" });
    }
});

app.post("/enroll/multiple", auth, async (req, res) => {
    try {
        const ids = req.body.courses || [];

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { myCourses: { $each: ids } }
        });

        // Increment enrolled count for all courses
        await Course.updateMany(
            { _id: { $in: ids } },
            { $inc: { enrolledCount: 1 } }
        );

        res.json({ message: "Enrolled successfully" });
    } catch {
        res.status(500).json({ message: "Enrollment failed" });
    }
});

// Check enrollment status
app.get("/enroll/check/:courseId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const isEnrolled = user.myCourses?.some(c => c.toString() === req.params.courseId);
        res.json({ enrolled: isEnrolled });
    } catch {
        res.status(500).json({ message: "Failed to check enrollment" });
    }
});

// ---------- USER COURSES ----------
app.get("/user/courses", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("myCourses");
        res.json(user.myCourses || []);
    } catch {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
});

// ---------- PROGRESS ----------
app.post("/progress/complete", auth, async (req, res) => {
    try {
        const { courseId, lessonId } = req.body;

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { completedLessons: { course: courseId, lesson: lessonId } }
        });

        res.json({ message: "Lesson marked as complete" });
    } catch {
        res.status(500).json({ message: "Failed to update progress" });
    }
});

app.get("/progress/:courseId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const completed = user.completedLessons?.filter(
            l => l.course.toString() === req.params.courseId
        ) || [];
        res.json({ completedLessons: completed.map(l => l.lesson) });
    } catch {
        res.status(500).json({ message: "Failed to get progress" });
    }
});

// ---------- REVIEWS ----------
app.post("/courses/:id/reviews", auth, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const user = await User.findById(req.user._id);

        await Course.findByIdAndUpdate(req.params.id, {
            $push: {
                reviews: {
                    user: user._id,
                    userName: user.name,
                    rating,
                    comment,
                }
            }
        });

        res.json({ message: "Review added" });
    } catch {
        res.status(500).json({ message: "Failed to add review" });
    }
});

// ---------- CERTIFICATES ----------
app.get("/user/certificates", auth, async (req, res) => {
    try {
        const certificates = await Certificate.find({ user: req.user._id });
        res.json(certificates);
    } catch {
        res.status(500).json({ message: "Failed to fetch certificates" });
    }
});

app.get("/user/certificates/:id", auth, async (req, res) => {
    try {
        const cert = await Certificate.findOne({ _id: req.params.id, user: req.user._id });
        if (!cert) return res.status(404).json({ message: "Certificate not found" });
        res.json(cert);
    } catch {
        res.status(500).json({ message: "Failed to fetch certificate" });
    }
});

app.post("/user/certificates", auth, async (req, res) => {
    try {
        const { courseTitle, studentName } = req.body;
        const cert = await Certificate.create({
            user: req.user._id,
            courseTitle,
            studentName,
        });
        res.json(cert);
    } catch {
        res.status(500).json({ message: "Failed to create certificate" });
    }
});

// ---------- USER PROFILE ----------
app.put("/user/profile", auth, async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true }
        ).select("-password");
        res.json(user);
    } catch {
        res.status(500).json({ message: "Failed to update profile" });
    }
});

app.put("/user/password", auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        const ok = await user.comparePassword(currentPassword);
        if (!ok) return res.status(400).json({ message: "Current password is incorrect" });

        user.password = newPassword;
        await user.save();
        res.json({ message: "Password updated" });
    } catch {
        res.status(500).json({ message: "Failed to update password" });
    }
});

// ---------- DB + SERVER ----------
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Backend running on port", PORT));
