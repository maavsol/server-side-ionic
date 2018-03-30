const express = require('express');
const Address = require('../models/Address');

const router = express.Router();

router.post('/addNewAddress/:id', (req, res, next) => {
   
  const user = req.params.id;

  const { streetName, postalCode, floor } = req.body;

  const addressData = { user, streetName, postalCode, floor };
  console.log(addressData)
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
