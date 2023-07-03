const { Sequelize, DataTypes } = require('sequelize');

// Initialize DB server

const sequelize = new Sequelize('harvestcorpdb', 'root', 'pass', {
    host: 'localhost',
    dialect: 'mariadb'
});