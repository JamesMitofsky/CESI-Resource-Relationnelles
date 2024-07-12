const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const secretOrKey = process.env.SECRET_OR_KEY;

// Load User model
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ email: "User not found" });
  }

  // Check password
  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      // User matched
      // Create JWT payload
      const payload = { id: user.id, name: user.name, role: user.role };

      // Sign token
      jwt.sign(
        payload,
        secretOrKey,
        { expiresIn: 3600 }, // 1 hour in seconds
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } else {
      return res.status(400).json({ password: "Password incorrect" });
    }
  });
});

// @route   POST api/users
// @desc    Register a user
router.post("/", async (req, res) => {
  const {
    name,
    firstName,
    password,
    phone,
    email,
    healthCard,
    role,
    accountStatus,
    sharedResources,
    groups,
  } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    firstName,
    password: hashedPassword,
    phone,
    email,
    healthCard,
    role,
    accountStatus,
    sharedResources,
    groups,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET api/users
// @desc    Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET api/users/:id
// @desc    Get a user by id
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// @route   PUT api/users/:id
// @desc    Update a user
router.put("/:id", getUser, async (req, res) => {
  const {
    name,
    firstName,
    password,
    phone,
    email,
    healthCard,
    role,
    accountStatus,
    sharedResources,
    groups,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (name != null) {
    res.user.name = name;
    res.user.firstName = firstName;
    res.user.password = hashedPassword;
    res.user.phone = phone;
    res.user.email = email;
    res.user.healthCard = healthCard;
    res.user.role = role;
    res.user.accountStatus = accountStatus;
    res.user.sharedResources = sharedResources;
    res.user.groups = groups;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   DELETE api/users/:id
// @desc    Delete a user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware function for getting user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
