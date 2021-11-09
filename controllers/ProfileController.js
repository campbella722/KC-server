const express = require('express')
const router = express.Router()
const validateJWT = require('../middleware/validate-jwt');
// const { User } = require('../models');
const { Profile } = require('../models');

// router.get('/practice', validateJWT, (req,res) => {
//     res.send('this is a practice route')
// });

/*
================
Profile Create
================
*/

router.post("/create", validateJWT, async (req, res) => {
    const {address, city, state, zipcode, phone} = req.body.profile;
    const { id } = req.user.id;
    const profileEntry = {
        address, 
        city, 
        state, 
        zipcode, 
        phone, 
        GuestId: id
    }
    try {
        const newProfile = await Profile.create(profileEntry); 
        res.status(200).json(
            {
                message: "Profile Created!",
                newProfile});
    } catch (err) {
        res.status(500).json({error: err, message: "Unable to create profile"});
    }
    // Profile.create(profileEntry)
});

/*
================
Profile Get
================
*/

router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userProfiles = await Profile.findAll ({
            where: {
                GuestId: id
            }
        });        
        res.status(200).json(userProfiles);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Unable to find profile"});
    }
});

/*
================
Profile Update
================
*/
router.put('/update/:entryId', validateJWT, async (req, res) =>{
    const {address, city, state, zipcode, phone} = req.body.profile;
    // const profileId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            // id: profileId,
            GuestId: userId
        }
    };

    const updatedProfile = {
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        phone: phone
    };

    try {
        const update = await Profile.update(updatedProfile, query);
        res.status(200).json(update);
        console.log("Update successful!")
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Cannot update profile"
        });
    }
});


// router.get('/about', (req,res) => {
//     res.send('This is about route')
// });

module.exports = router;