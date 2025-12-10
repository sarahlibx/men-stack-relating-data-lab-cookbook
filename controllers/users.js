// controllers/users.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

  // INDEX — GET /users/:userId/foods
  router.get('/', async (req, res) => {
    try {
        const users = await User.find({});

        res.render('users/index.ejs', { users });

    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  module.exports = router;