import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Course from "./models/Course.js";

dotenv.config();

const categoriesList = [
    "Programming",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
    "Graphic Design",
    "Business & Finance",
    "Marketing",
    "Mobile Development",
    "UI/UX Design"
];

const sampleLessons = [
    { title: "Introduction to the Course", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "5:30", order: 1 },
    { title: "Getting Started - Setup", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "12:15", order: 2 },
    { title: "Core Concepts Explained", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "18:45", order: 3 },
    { title: "Hands-on Practice", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "22:00", order: 4 },
    { title: "Advanced Techniques", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "15:30", order: 5 },
    { title: "Building a Project", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "35:00", order: 6 },
    { title: "Best Practices", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "10:20", order: 7 },
    { title: "Final Project & Wrap Up", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "25:00", order: 8 },
];

const courseList = [
    {
        title: "React for Beginners",
        description: "Learn React step-by-step and build modern web applications. This comprehensive course covers components, state, hooks, and real-world projects.",
        shortDescription: "Master React.js fundamentals",
        price: 499,
        thumbnail: "https://picsum.photos/seed/react/400/300",
        instructor: { name: "Rahul Sharma", bio: "Senior Frontend Developer with 8+ years experience" },
        level: "Beginner",
        duration: "8 hours",
        rating: 4.8,
        enrolledCount: 2450,
    },
    {
        title: "Python Zero to Hero",
        description: "Master Python with real-world coding exercises. From basics to advanced concepts including OOP, file handling, and web scraping.",
        shortDescription: "Complete Python programming",
        price: 599,
        thumbnail: "https://picsum.photos/seed/python/400/300",
        instructor: { name: "Priya Patel", bio: "Data Scientist at Tech Corp" },
        level: "Beginner",
        duration: "12 hours",
        rating: 4.7,
        enrolledCount: 3200,
    },
    {
        title: "Machine Learning Bootcamp",
        description: "Understand ML algorithms and build predictive models. Covers regression, classification, clustering, and neural networks.",
        shortDescription: "AI & ML fundamentals",
        price: 899,
        thumbnail: "https://picsum.photos/seed/ml/400/300",
        instructor: { name: "Dr. Arun Kumar", bio: "AI Researcher and Professor" },
        level: "Advanced",
        duration: "20 hours",
        rating: 4.9,
        enrolledCount: 1890,
    },
    {
        title: "UI/UX Design Masterclass",
        description: "Learn user experience principles and design stunning interfaces. Covers Figma, prototyping, and design systems.",
        shortDescription: "Design beautiful interfaces",
        price: 699,
        thumbnail: "https://picsum.photos/seed/uiux/400/300",
        instructor: { name: "Sneha Gupta", bio: "Lead Designer at Creative Studio" },
        level: "Intermediate",
        duration: "10 hours",
        rating: 4.6,
        enrolledCount: 1560,
    },
    {
        title: "Full-Stack JavaScript",
        description: "Become a full-stack developer using Node.js and React. Build complete web applications from frontend to backend.",
        shortDescription: "MERN Stack Development",
        price: 999,
        thumbnail: "https://picsum.photos/seed/fullstack/400/300",
        instructor: { name: "Vikram Singh", bio: "Full-Stack Architect at StartupX" },
        level: "Intermediate",
        duration: "25 hours",
        rating: 4.8,
        enrolledCount: 2100,
    },
    {
        title: "Cybersecurity Fundamentals",
        description: "Learn ethical hacking, system security and protection. Covers network security, cryptography, and penetration testing.",
        shortDescription: "Protect digital assets",
        price: 799,
        thumbnail: "https://picsum.photos/seed/security/400/300",
        instructor: { name: "Amit Verma", bio: "Certified Ethical Hacker" },
        level: "Intermediate",
        duration: "15 hours",
        rating: 4.7,
        enrolledCount: 980,
    },
    {
        title: "Digital Marketing Expert Course",
        description: "Master SEO, ads, branding, analytics and more. Learn to grow businesses through digital channels.",
        shortDescription: "Grow your online presence",
        price: 499,
        thumbnail: "https://picsum.photos/seed/marketing/400/300",
        instructor: { name: "Neha Kapoor", bio: "Marketing Director at AdAgency" },
        level: "Beginner",
        duration: "8 hours",
        rating: 4.5,
        enrolledCount: 1750,
    },
    {
        title: "Android Development Using Kotlin",
        description: "Build native Android apps with Kotlin and Jetpack. From basics to publishing on Play Store.",
        shortDescription: "Build Android apps",
        price: 899,
        thumbnail: "https://picsum.photos/seed/android/400/300",
        instructor: { name: "Karthik Rajan", bio: "Senior Android Developer" },
        level: "Intermediate",
        duration: "18 hours",
        rating: 4.6,
        enrolledCount: 1320,
    },
    {
        title: "Data Analysis with Pandas",
        description: "Work with real datasets using Pandas and NumPy. Data cleaning, visualization, and statistical analysis.",
        shortDescription: "Analyze data like a pro",
        price: 549,
        thumbnail: "https://picsum.photos/seed/pandas/400/300",
        instructor: { name: "Ananya Reddy", bio: "Data Analyst at BigData Inc" },
        level: "Intermediate",
        duration: "10 hours",
        rating: 4.7,
        enrolledCount: 890,
    },
    {
        title: "Advanced Node.js",
        description: "Master Node.js backend performance and architecture. Covers microservices, caching, and production deployment.",
        shortDescription: "Scale Node.js apps",
        price: 799,
        thumbnail: "https://picsum.photos/seed/nodejs/400/300",
        instructor: { name: "Suresh Menon", bio: "Backend Architect" },
        level: "Advanced",
        duration: "14 hours",
        rating: 4.8,
        enrolledCount: 760,
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        await Category.deleteMany({});
        await Course.deleteMany({});

        const categories = await Category.insertMany(
            categoriesList.map((name) => ({ name }))
        );
        console.log("Categories created:", categories.length);

        const coursesToInsert = [];

        for (let i = 0; i < courseList.length; i++) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            coursesToInsert.push({
                ...courseList[i],
                category: randomCategory._id,
                lessons: sampleLessons,
                reviews: [
                    { userName: "Student A", rating: 5, comment: "Excellent course! Highly recommended." },
                    { userName: "Student B", rating: 4, comment: "Very informative and well-structured." },
                ],
            });
        }

        await Course.insertMany(coursesToInsert);

        console.log("Database seeded successfully with 10 categories and 10 courses!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seedDatabase();
