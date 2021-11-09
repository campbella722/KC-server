let express = require('express')
const { UniqueConstraintError } = require('sequelize/lib/errors')
let router = express.Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// router.get('', (req, res) => {
//   res.send('hello world')
// })

router.post('/register', async (req, res) => {

let { firstname, lastname, email, password  } = req.body.user;
  try {
    const registerUser = await User.create(
      {
        firstname,
        lastname,
        email,
        password: bcrypt.hashSync(password, 13),
        isAdmin: false
      });

      let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

    res.status(201).json({
      message: 'user created',
      user: registerUser,
      sessionToken: token
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email already in use",
      });
    } else {      
    res.status(500).json({
      message: "Failure to register user!",
    });
    }
  }
});

router.post('/login', async (req, res) => {
  let { email, password  } = req.body.user;

  try {
    const loginUser = await User.findOne({
    where: {
      email: email,
    },
  });

    if (loginUser) {

      let passwordComparison = await bcrypt.compare(password, loginUser.password);
      if (passwordComparison) {
        let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
      res.status(200).json({
        user: loginUser,
        message: "Successful login!",
        sessionToken: token
      });
      } else {
        res.status(401).json({
          message: 'Login failed',
        })
      }

      
    } else {
      res.status(401).json({
        message: 'Incorrect email or password',
      });
    }

} catch (error) {
  res.status(500).json({
    message: 'Login failure',
  })
}

});
// let my_profile = await Profile.create({
//     address: "123 Main St",
//     city: "Chicago",
//     state: "IL",
//     zipcode: "09876",
//     phone:"123456789"

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
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })

module.exports = router