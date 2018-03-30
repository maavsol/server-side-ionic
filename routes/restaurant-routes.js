const Restaurant = require('../models/Restaurant.js');
const express = require('express');

const router = express.Router();

// para probar siempre los mismos, luego implementare seleccion por codigo postal
router.get('/getAllRestaurants', (req, res, next) => {
  Restaurant.find()
    .then(foundRestaurants => res.status(200).json(foundRestaurants))
    .catch(e =>
      res.status(500).json(e));
});

router.post('/createRestaurant/:id', (req, res) => {
  const userId = req.params.id;
  const { name, telephone, pepperoniPrice, barbacuePrice, hamAndCheesePrice, fourCheesePrice } = req.body;
  const postalCodesServedto = req.body.postalCodesServedto.replace(/\s+/g, '').split(',');
  const restaurantData = { userId, name, telephone, pepperoniPrice, barbacuePrice, hamAndCheesePrice, fourCheesePrice, postalCodesServedto };
  const restaurant = new Restaurant(restaurantData);
  restaurant
    .save()
    .then(savedRestaurant => res.status(200).json(savedRestaurant))
    .catch(e =>
      res.status(500).json(e));
});

module.exports = router;

