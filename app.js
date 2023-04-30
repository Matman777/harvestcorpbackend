const express = require('express');
const { Sequelize } = require('sequelize');

// Initialize DB server

const sequelize = new Sequelize('harvestcorpdb', 'root', 'pass', {
    host: 'localhost',
    dialect: 'mariadb'
});

// Create a User Model (a model will create a table inside the DB, and we'll be able to access to the users inside this table)



// IIFE (Immediatly Invoked Function Expression) (Create the auto invoked function "async" to work with the "await")
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();




// Initialize application server
const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
    res.send('Oh yeah, my server is running :-)');
});

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT} et on est bien content!`)
});

// app.get('/', (req, res) => { /* */ })
// app.post('/', (req, res) => { /* */ })
// app.put('/', (req, res) => { /* */ })
// app.delete('/', (req, res) => { /* */ })
// app.patch('/', (req, res) => { /* */ })


// app.listen(PORT);