const { Sequelize, DataTypes } = require('sequelize');

const DefineItem = (sequelize) => {
    const Item = sequelize.define("Item", {
        batchSize: {
            type: DataTypes.STRING
        },
        batchFlavor: {
            type: DataTypes.STRING
        },
        batchNumber: {
            type: DataTypes.INTEGER
        },
        itemCost: {
            type: DataTypes.DECIMAL
        }
    })
    return Item
}

module.exports = DefineItem
