// controllers/foods.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// INDEX — GET /users/:userId/foods
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    res.locals.pantry = user.pantry;
    res.locals.user = user;
    
    res.render('foods/index.ejs');
    
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// NEW — GET /users/:userId/foods/new
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { userId: req.session.user._id });
});

// CREATE — POST /users/:userId/foods
router.post('/', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  user.pantry.push({ foods: req.body.name });
  await user.save();

  res.redirect(`/users/${user._id}/foods`);
});

// SHOW - GET /users/:userId/foods/:itemId
// router.get('/:itemId', async (req, res) => {
//   try {
//     const user = await User.findById(req.session.user._id);
//     const food = user.foods.id(req.params.itemId);
    
//     res.render('foods/show.ejs', {
//       foods: food,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect('/');
//   }
// }); 

module.exports = router;
