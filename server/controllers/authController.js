import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async(req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({success: false, message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
       
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


export const login = async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({success: false, message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
