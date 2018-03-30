const Restaurant = require('../models/Restaurant.js');
const express = require('express');

const router = express.Router();

// para probar siempre los mismos, luego implementare seleccion por codigo postal
router.get('/getAllRestaurants', (req, res, next) => {
  Restaurant.find()
    .then(foundRestaurants => res.status(200).json(foundRestaurants))
    .catch(e => res.status(500).json(e));
});

router.post('/createRestaurant/:id', (req, res) => {
  const userId = req.params.id;
  const {
    name,
    telephone,
    pepperoniPrice,
    barbacuePrice,
    hamAndCheesePrice,
    fourCheesePrice,
  } = req.body;
  const postalCodesServedto = req.body.postalCodesServedto
    .replace(/\s+/g, '')
    .split(',');
  const restaurantData = {
    userId,
    name,
    telephone,
    pepperoniPrice,
    barbacuePrice,
    hamAndCheesePrice,
    fourCheesePrice,
    postalCodesServedto,
  };
  const restaurant = new Restaurant(restaurantData);
  restaurant
    .save()
    .then(savedRestaurant => res.status(200).json(savedRestaurant))
    .catch(e => res.status(500).json(e));
});

router.post('/sendOrderedPizzasToCalculatePrice', (req, res, next) => {
  console.log('la ruta me da esto');
  console.log(req.body.orderedPizzas);

  const myQuantityArray = (function calculateQuantities() {
    let totalPepperoni;
    let totalHamAndCheese;
    let totalfourCheese;
    let totalBarbacue;
    let hamAndCheeseQ = 0;
    let pepperoniQ = 0;
    let fourCheeseQ = 0;
    let barbacueQ = 0;
    req.body.orderedPizzas.map((e) => {
      if (e.name === 'PEPPERONI') {
        pepperoniQ = e.number;
      }
      if (e.name === 'JAMON Y QUESO') {
        hamAndCheeseQ = e.number;
      }
      if (e.name === 'CUATRO QUESOS') {
        fourCheeseQ = e.number;
      }
      if (e.name === 'BARBACOA') {
        barbacueQ = e.number;
      }
    });
    return [pepperoniQ, hamAndCheeseQ, fourCheeseQ, barbacueQ];
  }());

  Restaurant.find().then((arrayOfRestaurants) => {
    const arrayOfPrices = [];
    arrayOfRestaurants
      .map((e) => {
        totalPepperoni = e.pepperoniPrice * myQuantityArray[0];
        totalHamAndCheese = e.hamAndCheesePrice * myQuantityArray[1];
        totalfourCheese = e.fourCheesePrice * myQuantityArray[2];
        totalBarbacue = e.barbacuePrice * myQuantityArray[3];
        const totalPrice =
          totalPepperoni + totalHamAndCheese + totalfourCheese + totalBarbacue;
        arrayOfPrices.push(totalPrice);
      });
    res.status(200).json(arrayOfPrices);
  })
    .catch(e => res.status(500).json(e));
});

module.exports = router;

//   const restaurants = restaurantsWhichServeMe.map((singleRestaurant) => {
//     const totalJamonYQueso = singleRestaurant.jamonYQuesoPrice * quantity.jamonYQuesoPrice || 0;
//     const totalCuatroQuesos = singleRestaurant.cuatroQuesosPrice * quantity.cuatroQuesosPrice || 0;
//     const totalBarbacoa = singleRestaurant.barbacoaPrice * quantity.barbacoaPrice || 0;
//     const totalPepperoni = singleRestaurant.peperonniPrice * quantity.peperonniPrice || 0;
//     const orderTotalPrice = totalJamonYQueso + totalCuatroQuesos + totalBarbacoa + totalPepperoni;
//     const orderInRestaurant = singleRestaurant;
//     orderInRestaurant.totalPriceOfOrder = orderTotalPrice;
//     return orderInRestaurant;
//   });
//   res.status(200).json(restaurants);
// })
//   .catch(e => res.status(500).json(e));
