const express = require('express');
const router = express.Router();

// on importe ici notre logique d'action
const sauceCtrl = require('../controllers/sauces');

// on importe le middleware de contorle d'identité
const auth = require('../middleware/auth');

// on importe notre solution multer
const multer = require('../middleware/multer-config');

// on applique ici notre fonction de création de sauce depuis controllers/sauces
router.post('/', auth, multer, sauceCtrl.createSauce);
//
// on applique ici notre fonction de modification de sauce depuis controllers/sauces
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// on applique ici notre fonction de suppression de sauce depuis controllers/sauces
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// ici on liste l'ensemble des sauces
router.get('/', auth, sauceCtrl.getAllSauces);

// ici on cherche a n'afficher qu'une seule sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);



// on exporte ces routers
module.exports = router;