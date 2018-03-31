const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.post('/createOrder', (req, res, next) => {
  const user = req.body.userId;
  const addressToServe = req.body.address._id;
  const restaurant = req.body.restaurantId;
  const numberOfPepperoniOrdered = req.body.quantities.pepperoniQ;
  const numberOfBarbacueOrdered = req.body.quantities.barbacueQ;
  const numberOfFourCheeseOrdered = req.body.quantities.fourCheeseQ;
  const numberOfHamAndCheeseOrdered = req.body.quantities.hamAndCheeseQ;

  const orderData = {
    user,
    restaurant,
    addressToServe,
    numberOfPepperoniOrdered,
    numberOfBarbacueOrdered,
    numberOfFourCheeseOrdered,
    numberOfHamAndCheeseOrdered,
  };

  const order = new Order(orderData);

  order
    .save()
    .then(createdOrder => res.status(200).json(createdOrder))
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

router.get('/getMyOrder/:id', (req, res, next) => {
  console.log('entro en el back')
  console.log(req.params.id)
  Order.findById(req.params.id).populate('addressToServe restaurant user')
    .then(foundOrder => res.status(200).json(foundOrder))
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

module.exports = router;
