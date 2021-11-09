require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

app.use(require('./middleware/headers'))

const user = require('./controllers/UserController')
const profile = require('./controllers/ProfileController')
const order = require('./controllers/OrderController')
const item = require('./controllers/ItemController')


app.use(express.json())
app.use('/user', user)
app.use('/profile', profile)
app.use('/order', order)
app.use('/item', item)

// app.use(require('./middleware/validate-jwt'));


app.listen(port, () => {
  console.log(`HOT DAMN! Something I coded works! App is listening at http://localhost:${port}`)
})

