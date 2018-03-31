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
  Order.findById(req.params.id).populate('addressToServe restaurant user')
    .then(foundOrder => res.status(200).json(foundOrder))
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

router.post('/updateOrderStatus/:id', (req, res, next) => {
  const message = req.body.message;
  let update;
  if (message === 'accepted') {
    update = { status: 'accepted' };
  }
  if (message === 'rejected') {
    update = { status: 'rejected' };
  }
  Order.findByIdAndUpdate(req.params.id, update, { new: true }).populate('addressToServe restaurant user')
    .then(updatedOrder => res.status(200).json(updatedOrder))
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

router.get('/getAllOrders', (req, res, next) => {
  Order.find().populate('addressToServe restaurant user')
    .then(allOrders => res.status(200).json(allOrders))
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

router.get('/getUserOrdersHistory/:id', (req, res, next) => {
  Order.find({ user: req.params.id }).populate('addressToServe restaurant user')
    .then(foundOrders => res.status(200).json(foundOrders))
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

module.exports = router;
