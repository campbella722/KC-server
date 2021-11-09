let express = require('express')
let router = express.Router()
// const { User } = require('./models/User.js')

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.get('', (req, res) => {
  res.send('hello world')
})

router.post('/register', async (req, res) => {

// let { firstname, lastname, email, password, isAdmin  } = req.body.user;

 User.create(
    {
        firstname: "ari",
        lastname: "camp",
        email: "hey@you.com",
        password: "guest",
        isAdmin: flse
    });
    res.send( 'user created')
// let my_profile = await Profile.create({
//     address: "123 Main St",
//     city: "Chicago",
//     state: "IL",
//     zipcode: "09876",
//     phone:"123456789"
})
// console.log(await my_user.getProfile())
// await my_user.setProfile(my_profile)
// console.log(await my_user.getProfile())


// let resultUser = await User.findOne({
//     where: {
//         id: 1
//     }
// })
// console.log(await resultUser.getProfile())

// // } )


// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router