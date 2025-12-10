// controllers/foods.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');

// INDEX — GET /users/:userId/foods
router.get('/', async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.render('foods/index.ejs', { user });
});

// NEW — GET /users/:userId/foods/new
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { userId: req.params.userId });
});

// CREATE — POST /users/:userId/foods
router.post('/foods', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.pantry.push({ foods: req.body.name });
  await user.save();

  res.redirect(`/users/${req.params.userId}/foods`);
});

module.exports = router;
