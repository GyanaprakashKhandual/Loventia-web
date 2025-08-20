const Profile = require("../models/profile.model");

const createProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT auth middleware

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists for this user" });
    }

    const profile = new Profile({
      user: userId,
      ...req.body, // take profilePic, nickName, age, skills, profession, industry
    });

    await profile.save();
    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Edit/Update Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ error: "Profile not found for this user" });
    }

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get current user's profile
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId }).populate("user", "name email");

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all profiles (for admin or general listing)
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getMyProfile,
  getAllProfiles,
};
