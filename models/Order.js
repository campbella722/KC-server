const { Sequelize, DataTypes } = require('sequelize');

const DefineOrder = (sequelize) => {
    const Order = sequelize.define("Order", {
        shippingAddress: {
            type: DataTypes.STRING
        },
        shippingCity: {
            type: DataTypes.STRING
        },
        shippingState: {
            type: DataTypes.STRING
        },
        shippingZipcode: {
            type: DataTypes.STRING
        },
        shippingPhone: {
            type: DataTypes.STRING
        },
        requestByDate: {
            type: DataTypes.STRING
        },
        subtotal: {
            type: DataTypes.DECIMAL
        }
    })
    return Order
}

module.exports = DefineOrder
