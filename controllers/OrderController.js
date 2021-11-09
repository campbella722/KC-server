let express = require('express')
let router = express.Router()
let validateJWT = require('../middleware/validate-jwt');
// const { User } = require('../models')
const { Order } = require('../models');

/*
================
Order Create
================
*/

router.post("/create", validateJWT, async (req, res) => {
    const {shippingAddress, shippingCity, shippingState, shippingZipcode, shippingPhone, requestByDate, subtotal} = req.body.order;
    const { id } = req.user;
    const orderEntry = {
        shippingAddress, 
        shippingCity, 
        shippingState, 
        shippingZipcode, 
        shippingPhone, 
        requestByDate, 
        subtotal,
        GuestId: id
    }
    try {
        const newOrder = await Order.create(orderEntry); 
        res.status(200).json(newOrder);
    } catch (err) {
        res.status(500).json({error: err,
            message: "Unable to create Order"});
    }
});

/*
================
Order Get All
================
*/

router.get("/", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userOrders = await Order.findAll ({
            where: {
                GuestId: id
            }
        });        
        res.status(200).json(userOrders);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Unable to find Orders"});
    }
});


/*
================
Order Get One
================
*/

router.get  ('/:id', async (req, res) => {
    const { id } = req.params;
    try { 
        const results = await Order.findAll({
            where: { id: id }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Order not found"
        });
    }
});

/*
================
Order Update
================
*/

router.put('/:id', validateJWT, async (req, res) =>{
    const {shippingAddress, shippingCity, shippingState, shippingZipcode, shippingPhone, requestByDate, subtotal} = req.body.order;
    // const profileId = req.params.entryId;
    // const userId = req.user.id;
    const { id } = req.params;

    const query = {
        where: {
            // id: profileId,
            id: id
        }
    };

    const updatedOrder = {
        shippingAddress: shippingAddress, 
        shippingCity: shippingCity, 
        shippingState: shippingState, 
        shippingZipcode: shippingZipcode, 
        shippingPhone: shippingPhone, 
        requestByDate: requestByDate, 
        subtotal: subtotal,
        id: id
    };

    try {
        const update = await Order.update(updatedOrder, query);
        res.status(200).json(update);
        console.log("Update successful!")
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Cannot update Order"
        });
    }
});


/*
================
Order Delete
================
*/

module.exports = router;