import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
    console.log("Connected to DB");

    await User.create({
        name: "Admin",
        email: "admin@example.com",
        password: "admin123",
        isAdmin: true
    });

    console.log("Admin created successfully");
    process.exit(0);
});
