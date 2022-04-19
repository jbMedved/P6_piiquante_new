// on importe nos modeles de sauces
const Sauce = require('../models/Sauce');


//on exporte la fonction "création" (post)
exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "sauce enregistrée" }))
        .catch(error => res.status(400).json({ error }));
};
//on exporte la fonction "modification" (put)
exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'sauce mise à jour' }))
        .catch(error => res.status(400).json({ error }));
};

//on exporte la fonction "suppression" (delete)
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'sauce supprimée' }))
        .catch(error => res.status(400).json({ error }));
};

//on exporte la fonction "afficher une sauce" (get)
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

//on exporte la fonction "afficher les sauces" (get)
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};