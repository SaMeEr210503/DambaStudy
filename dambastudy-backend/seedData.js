import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Course from "./models/Course.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing data
    await Category.deleteMany({});
    await Course.deleteMany({});

    // Add Categories
    const categories = await Category.insertMany([
        { name: "Programming" },
        { name: "Design" },
        { name: "Marketing" }
    ]);

    // Add Courses
    await Course.insertMany([
        {
            title: "React for Beginners",
            description: "Learn React from scratch and build real-world projects.",
            price: 499,
            thumbnail: "https://picsum.photos/400/300",
            category: categories[0]._id
        },
        {
            title: "UI/UX Masterclass",
            description: "Design beautiful interfaces with hands-on lessons.",
            price: 599,
            thumbnail: "https://picsum.photos/400/301",
            category: categories[1]._id
        },
        {
            title: "Digital Marketing Bootcamp",
            description: "Master SEO, Ads, and Social Media Marketing.",
            price: 399,
            thumbnail: "https://picsum.photos/400/302",
            category: categories[2]._id
        }
    ]);

    console.log("Sample categories & courses created.");
    process.exit(0);
});
