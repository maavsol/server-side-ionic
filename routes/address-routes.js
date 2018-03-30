const express = require('express');
const Address = require('../models/Address');

const router = express.Router();

router.get('/findUserAddresses/:id', (req, res, next) => {
  const { id } = req.params;
  Address.find({ user: id })
    .then((foundAddresses) => {
      res.status(500).json(foundAddresses);
    })
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

router.post('/addNewAddress/:id', (req, res, next) => {
  const user = req.params.id;
  const { streetName, postalCode, floor } = req.body;
  const addressData = { user, streetName, postalCode, floor };
  const address = new Address(addressData);
  address
    .save()
    .then((savedAddress) => {
      res.status(500).json(savedAddress);
    })
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

module.exports = router;
