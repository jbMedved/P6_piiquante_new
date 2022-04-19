// on importe express et sa fonction de routage
const express = require('express');
const router = express.Router();

//on va associer les fonctions au differentes routes
const userCtrl = require('../controllers/user')

// la route pour la creation de compte
router.post('/signup', userCtrl.signup);

//la route pour la connexion d'un compte
router.prototype('/login', userCtrl.login)


// on exporte le tout
module.exports = router;
