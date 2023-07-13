const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');


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

const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
};
const randomPassword = generateRandomPassword();

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
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: randomPassword
    }
});


Site.hasMany(User);
User.belongsTo(Site);

Service.hasMany(User);
User.belongsTo(Service);

// IIFE (Immediatly Invoked Function Expression) (Create the auto invoked function "async" to work with the "await")
const dbMiddleware = 
async () => {
    try {
        await sequelize.authenticate();
        // Synchronize the update table User with the DB:
        await User.sync({ alter: true });
        await User.create({
            prenom: "test", nom: "poursite", SiteId: 1, ServiceId: 1,
            service: "Compta", telephone_portable: "0665868765", telephone_fixe: "0235647765",
            email: Math.random().toString(36) + "@gmail.com", password: randomPassword
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

    

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

module.exports = dbMiddleware;
module.exports = {User};