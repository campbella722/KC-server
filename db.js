const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);
console.log("inside db.js")

;((async () => {
    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    //     } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    //     }
    await sequelize.sync({
        force: true
    })
}))()

module.exports = {
    sequelize
}