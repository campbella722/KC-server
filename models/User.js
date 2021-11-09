const { Sequelize, DataTypes } = require('sequelize');
const DefineUser = (sequelize) => {
    const User = sequelize.define("Guest", {
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }); return User
}

module.exports = DefineUser;
