const express = require('express');
const app = express();
const cors = require('cors');

// Application creation
app.use(express.json());

// Using Cors as a middleware of the application
app.use(cors());

// Add routing
const router = require('./routes/router.js');
app.use('/api', router);


const dbMiddleware = require('./database/db.js');
dbMiddleware;
// (async () => {
//     try {
//       await dbMiddleware; // Appel du middleware
//       // Launch server
//       const PORT = 3001;
//       app.listen(PORT, () => {
//         console.log(`Le serveur tourne sur le port ${PORT} et on est bien content!`);
//       });
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de l\'exécution du middleware:', error);
//     }
//   })();

// Launch server
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT} et on est bien content!`);
});