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
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})

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

/*one to one rel */
User.hasOne(Profile, {
    onDelete: 'CASCADE'
}); //user.getProfile => get profile associated with id/user
Profile.belongsTo(User);

/*one to many rel */
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
        type: DataTypes.DATE
    },
    subtotal: {
        type: DataTypes.DECIMAL
    }
})
User.hasMany(Order);
Order.belongsTo(User);

const Item = sequelize.define("Item", {
    batchSize: {
        type: DataTypes.STRING
    },
    batchFlavor: {
        type: DataTypes.STRING
    },
    batchNumber: {
        type: DataTypes.DECIMAL
    },
    itemCost: {
        type: DataTypes.DECIMAL
    }
})

Order.hasMany(Item);
Item.belongsTo(Order);

// const Status = sequelize.define("Status", {
//     isReceived: {
//         type: DataTypes.BOOLEAN
//     },
//     isInProgress: {
//         type: DataTypes.BOOLEAN
//     },
//     isInTransit: {
//         type: DataTypes.BOOLEAN
//     },
//     isCompleted: {
//         type: DataTypes.BOOLEAN
//     },
//     isCancelled: {
//         type: DataTypes.BOOLEAN
//     }
// })
// Order.hasOne(Status);
// Status.belongsTo(Order);


/*Many to many rel*/


;((async () => {
    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    //     } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    //     }
    await sequelize.sync({
        force: true
    });

    let my_user = await User.create(
        {
            firstname: "Arianne",
            lastname: "Domka",
            email:"user@email.com",
            password: "pw1234"
        })
    let my_profile = await Profile.create({
        address: "123 Main St",
        city: "Chicago",
        state: "IL",
        zipcode: "09876",
        phone:"123456789"
    })
    console.log(await my_user.getProfile())
    await my_user.setProfile(my_profile)
    console.log(await my_user.getProfile())


    let resultUser = await User.findOne({
        where: {
            id: 1
        }
    })
    console.log(await resultUser.getProfile())

})());

