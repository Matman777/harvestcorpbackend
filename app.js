const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const enumerate = require('@js-bits/enumerate');



// Initialize DB server

const sequelize = new Sequelize('harvestcorpdb', 'root', 'pass', {
    host: 'localhost',
    dialect: 'mariadb'
});


// Create a User Model (a model will create a table inside the DB, and we'll be able to access to the users inside this table)
// sequelize is already link to the DB because we put inside it an instance of Sequelize

const Site = sequelize.define("Site", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

const Service = sequelize.define("Service", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

const User = sequelize.define("User", {
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone_portable: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone_fixe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('visitor', 'admin'),
        defaultValue: 'visitor'
    }
});


Site.hasMany(User);
User.belongsTo(Site);

Service.hasMany(User);
User.belongsTo(Service);

// IIFE (Immediatly Invoked Function Expression) (Create the auto invoked function "async" to work with the "await")
(async () => {
    try {
        await sequelize.authenticate();
        // Synchronize the update table User with the DB:
        await User.sync({ alter: true });
        await User.create({
            prenom: "test", nom: "poursite", SiteId: 1, ServiceId: 1,
            service: "Compta", telephone_portable: "0665868765", telephone_fixe: "0235647765",
            email: Math.random().toString(36) + "@gmail.com"
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

    

(async () => {
        try {
            await sequelize.authenticate();
            // Synchronize the update table Site with the DB:
            await Site.sync({ alter: true });
            await Site.create({
                name: 'Nice'
            });

        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

(async () => {
    try {
        await sequelize.authenticate();
        // Synchronize the update table Service with the DB:
        await Service.sync({ alter: true });
        await Service.create({
            name: 'RH'
        });

    console.log('Connection to database has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
})();

// Initialize application server
const app = express();

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT} et on est bien content!`);
});

// app.get('/', async (req, res) => {
//     // Get all the Users
//     const users = await User.findAll();
    // Print users in the console
    // console.log("users", users);

    // Print users on the internet page:

//     const usersDisplay = users.map((user) => {
//         return `${user.dataValues.prenom}  ${user.dataValues.nom}  - ${user.dataValues.service} - ${user.dataValues.telephone}`
//     })
//     res.send(usersDisplay.join(" // "));
// });



// app.get('/', (req, res) => { /* */ })
// app.post('/', (req, res) => { /* */ })
// app.put('/', (req, res) => { /* */ })
// app.delete('/', (req, res) => { /* */ })
// app.patch('/', (req, res) => { /* */ })


// app.listen(PORT);