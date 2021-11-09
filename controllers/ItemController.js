let express = require('express')
let router = express.Router()
let validateJWT = require('../middleware/validate-jwt');
// const { User } = require('../models')
const { Item } = require('../models');

/*
================
Item Create
================
*/

router.post("/add", validateJWT, async (req, res) => {
    const {batchSize, batchFlavor, batchNumber, itemCost} = req.body.item;
    const { id } = req.user;
    const itemEntry = {
        batchSize, 
        batchFlavor, 
        batchNumber, 
        itemCost,
        OrderId: id
    }
    try {
        const newItem = await Item.create(itemEntry); 
        res.status(200).json(newItem);
    } catch (err) {
        res.status(500).json({error: err,
            message: "Unable to add item"});
    }
});


/*
================
Item Get All
================
*/

router.get("/", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userItems = await Item.findAll ({
            where: {
                OrderId: id
            }
        });        
        res.status(200).json(userItems);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Unable to find Items"});
    }
});


/*
================
Item Update
================
*/

router.put('/:id', validateJWT, async (req, res) =>{
    const {batchSize, batchFlavor, batchNumber, itemCost} = req.body.item;
    // const {id} = req.params;
    // const {orderId} = req.order.id;
    // const { id } = req.params.id;
    const { id } = req.params;

    const query = {
        where: {
            id: id
            // OrderId: orderId
        }
    };

    const updatedItem = {
        batchSize: batchSize, 
        batchFlavor: batchFlavor, 
        batchNumber: batchNumber, 
        itemCost: itemCost,
        // OrderId: orderId                                               
        id: id
    };

    try {
        const update = await Item.update(updatedItem, query);
        res.status(200).json(update);
        console.log("Update successful!")
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Cannot update item"
        });
    }
});


/*
================
Item Delete
================
*/

router.delete('/delete/:id', validateJWT, async(req, res) => {
    // const {orderId} = req.user;
    const {id} = req.params;

    try{
        const query = {
            where: {
                id: id,
                // OrderId: orderId 
            }
        };
        await Item.destroy(query);
        res.status(200).json({ message: "Item removed"});
    } catch (err) {
        res.status(500).json({error: err, message: "Cannot remove item"});
    }
});

module.exports = router;