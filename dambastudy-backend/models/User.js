import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
    myCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    completedLessons: [{
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        lesson: String,
    }],
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function (pw) {
    return bcrypt.compare(pw, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, isAdmin: this.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export default mongoose.model("User", userSchema);
