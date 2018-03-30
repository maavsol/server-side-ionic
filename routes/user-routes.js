const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// show all users
router.get('/showAllUsers', (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(e =>
      res.status(500).json({
        error: e.message,
      }));
});

// update user
router.post('/update/:id', (req, res) => {
  let update;
  if (req.body.info.email) {
    const username = req.body.info.email;
    update = {
      username,
    };
  }

  if (req.body.info.contrasena) {
    const password = req.body.info.contrasena;
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    update = {
      password: hashPass,
    };
  }

  if (req.body.info || req.body.info.telephone) {
    const telephone = req.body.info.telephone || req.body.info; //  ojo, no podemos cambiar el orden de estos
    update = {
      telephone,
    };
  }

  User.findByIdAndUpdate(req.params.id, update, {
    new: true,
  })
    .then(user => res.status(201).json(user))
    .catch(e =>
      res.status(500).json({
        error: e.message,
      }));
});

module.exports = router;