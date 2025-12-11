  // controllers/foods.js

  const express = require('express');
  const router = express.Router();
  const User = require('../models/user.js');
  const methodOverride = require('method-override');

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
  router.get('/:itemId', async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);
      const foodItem = user.pantry.id(req.params.itemId);
      
      res.render('foods/show.ejs', {
        foodItem
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  // DELETE /users/:userId/foods/:itemId
  router.delete('/:itemId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Use the Mongoose .deleteOne() method to delete
      // an application using the id supplied from req.params
      currentUser.pantry.id(req.params.itemId).deleteOne();
      // Save changes to the user
      await currentUser.save();
      // Redirect back to the applications index view
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

  // EDIT - GET /users/:userId/foods/:itemId/edit
  router.get('/:itemId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const foodItem = currentUser.pantry.id(req.params.itemId);

      res.locals.foodItem = foodItem;

      res.render('foods/edit.ejs');

    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  // UPDATE - PUT /users/:userId/foods/:itemId
  router.put('/:itemId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const foodItem = currentUser.pantry.id(req.params.itemId);

      foodItem.set(req.body);
      
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/foods/${req.params.itemId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  module.exports = router;
