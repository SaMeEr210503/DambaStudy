import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: String,
    videoUrl: String,
    duration: String,
    order: Number,
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    shortDescription: String,
    price: { type: Number, default: 0 },
    thumbnail: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    instructor: {
        name: { type: String, default: "DambaStudy Instructor" },
        avatar: String,
        bio: String,
    },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    duration: String,
    lessons: [lessonSchema],
    rating: { type: Number, default: 4.5 },
    enrolledCount: { type: Number, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userName: String,
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now },
    }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", courseSchema);
