const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../database/db.js');

router.get('/', (req, res,) => {
    return res.send('requête GET reçue pour la page home!')
 });

router.get('/annuaire', (req, res,) => {
    return res.send('requête GET reçue pour la page annuaire!')
 });



 router.post('/login', async (req, res, next) => {
   // Get the datas from the form
   const email = req.body.email;
   const password = req.body.password;

   try {
      // Check the user from the database
      console.log("--------------------------------");
      console.log(req.body);
      console.log("--------------------------------");
      const user = await User.findOne({ where: { email: email } });

      if(user) {
         // User found, check the password
         // const passwordMatch = await bcrypt.compare(password, user.password);

         if(user.password === password) {
            // Password Ok
            // Redirect to "annuaire"
            return res.json({ redirectUrl: '/annuaire' });
         }
      }

      // Informations invalid connexion

      return res.status(401).json({ message: 'Identifiants invalides'});
   }catch (error) {
      console.error('Une erreur a eu lieu lors de la vérification des identifiants: ', error);
      return res.status(500).json({ message: 'Erreur du serveur'});
   }
 });

module.exports = router;

// return res.send('page de log atteinte')