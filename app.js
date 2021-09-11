require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);

const User = sequelize.define("Guest", {
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})



/*one to one rel */


/*one to many rel */


/*Many to many rel*/




;((async () => {
    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    //     } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    //     }
    await sequelize.sync(/*{
        force: true
    }*/);
})());

