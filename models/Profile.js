const { Sequelize, DataTypes } = require('sequelize');

const DefineProfile = (sequelize) => {
    const Profile = sequelize.define("Profile", {
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        zipcode: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        }
    })
    return Profile
};


module.exports = DefineProfile;