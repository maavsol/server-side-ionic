const express = require('express');
const Address = require('../models/Address');

const router = express.Router();

router.get('/findUserAddresses/:id', (req, res, next) => {
  const { id } = req.params;
  Address.find({ user: id })
    .then((foundAddresses) => {
      res.status(200).json(foundAddresses);
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
      res.status(200).json(savedAddress);
    })
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

// edit address

router.post('/editAddress/:id', (req, res, next) => {
  const addressId = req.params.id;
  const { streetName, floor, postalCode } = req.body.data;

  const update = { streetName, floor, postalCode };

  Address.findByIdAndUpdate(addressId, update, { new: true })
    .then(updatedAddress => res.status(200).json(updatedAddress))
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});

// delete address
router.post('/deleteAddress/:id', (req, res, next) => {
  Address.findByIdAndRemove(req.params.id)
    .then(deletedAddress => res.status(200).json(deletedAddress))
    .catch(e =>
      res.status(500).json({
        error: e.mesesage,
      }));
});


module.exports = router;
