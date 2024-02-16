const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Load User model
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
router.post('/', async (req, res) => {
  const { name, firstName, password, phone, email, healthCard, role, accountStatus, sharedResources, groups } = req.body;

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
    groups
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
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET api/users/:id
// @desc    Get a user by id
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// @route   PUT api/users/:id
// @desc    Update a user
router.put('/:id', getUser, async (req, res) => {
  const { name, firstName, password, phone, email, healthCard, role, accountStatus, sharedResources, groups } = req.body;

  if (name != null) {
    res.user.name = name;
    res.user.firstName = firstName; 
    res.user.password = password;  
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
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted User' });
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
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;