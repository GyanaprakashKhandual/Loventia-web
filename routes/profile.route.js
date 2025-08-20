const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createProfile,
  updateProfile,
  getMyProfile,
  getAllProfiles,
} = require("../controllers/profile.controller");

const router = express.Router();

/**
 * @route   POST /api/profiles
 * @desc    Create profile (only once per user)
 * @access  Private
 */
router.post("/", authMiddleware, createProfile);

/**
 * @route   PUT /api/profiles
 * @desc    Update logged-in user's profile
 * @access  Private
 */
router.put("/", authMiddleware, updateProfile);

/**
 * @route   GET /api/profiles/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get("/me", authMiddleware, getMyProfile);

/**
 * @route   GET /api/profiles
 * @desc    Get all user profiles
 * @access  Public (or restrict to admin later)
 */
router.get("/", getAllProfiles);

module.exports = router;
