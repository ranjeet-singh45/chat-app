import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

//Signup a new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "Account already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password: hashPassword, bio
        });

        const token = generateToken(newUser._id)


        res.json({ success: true, userData: newUser, token, message: "Account created Successfully" })
    } catch (err) {
        console.log(err.message)
        res.json({ success: false, message: err.message })
    }
}

// Controller to a login a user

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({email});

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(userData._id)

        res.json({ success: true, userData: userData, token, message: "Login successful" })
    } catch (err) {
        console.log(err.message)
        res.json({ success: false, message: err.message })
    }
}

// Controller to check if user is authenticated

export const checkAuth = (req, res) => {
    res.json({success: true, user: req.user});
}

// Controller to upadate user profile

export const updateProfile = async (req, res) => {

    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        const updateData = {};
        if (bio) updateData.bio = bio;
        if (fullName) updateData.fullName = fullName;

        if (profilePic) {
            const upload = await cloudinary.uploader.upload(profilePic);
            updateData.profilePic = upload.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        res.json({ success: true, user: updatedUser });
    } catch (err) {
        console.log("Error updating profile:", err.message);
        res.json({ success: false, message: err.message });
    }
};
