const { sequelize, syncDb } = require('../db')

const DefineUser = require('./User')
const DefineProfile = require('./Profile')
const DefineItem = require('./Item')
const DefineOrder = require('./Order')

const User = DefineUser(sequelize)
const Profile = DefineProfile(sequelize)
const Item = DefineItem(sequelize)
const Order = DefineOrder(sequelize)


/*one to one rel */
User.hasOne(Profile, {
    onDelete: 'CASCADE'
}); //user.getProfile => get profile associated with id/user
Profile.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Item);
Item.belongsTo(Order);


sequelize.sync({alter: true})

module.exports = { 
    User, Profile, Item, Order 
}