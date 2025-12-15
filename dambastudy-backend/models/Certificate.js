import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseTitle: String,
    studentName: String,
    date: String,
});

export default mongoose.model("Certificate", certificateSchema);
