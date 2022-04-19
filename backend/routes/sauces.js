const express = require('express');

const router = express.Router();

//on importe ici notre logique d'action
const sauceCtrl = require('../controllers/sauces');

// on applique ici notre fonction de création de sauce depuis controllers/sauces
router.post('/', sauceCtrl.createSauce);

// on applique ici notre fonction de modification de sauce depuis controllers/sauces
router.put('/:id', sauceCtrl.modifySauce);

// on applique ici notre fonction de suppression de sauce depuis controllers/sauces
router.delete('/:id', sauceCtrl.deleteSauce);

// ici on liste l'ensemble des sauces
router.get('/', sauceCtrl.getAllSauces);

// ici on cherche a n'afficher qu'une seule sauce
router.get('/:id', sauceCtrl.getOneSauce);



// on exporte ces routers
module.exports = router;