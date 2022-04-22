// on importe nos modeles de sauces
const Sauce = require('../models/Sauce');

// on importe le package fs pour autoriser les differentes opérations liées 
// au systeme de fichier (comme supprimer une photo) 
const fs = require('fs');



//on exporte la fonction "création" (post)
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // console.log(req.body);
    // console.log("pouet");
    // console.log(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "sauce enregistrée" }))
        .catch(error => res.status(400).json({ error }));
};

//on exporte la fonction "modification" (put)
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'sauce mise à jour' }))
        .catch(error => res.status(400).json({ error }));
};

//on exporte la fonction "suppression" (delete)
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'sauce supprimée' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};

//on exporte la fonction "afficher une sauce" (get)
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));

};

//on exporte la fonction "afficher les sauces" (get)
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//ici on va gerer les likes/dislikes
exports.liking = (req, res, next) => {
    // console.log(req.body)
    // console.log(req.params)
    //req.body.userId
    //req.body.like
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // si on clique sur le bouton like
            if (req.body.like == 1) {
                sauce.usersLiked.push(req.body.userId);
                //console.log(sauce.usersLiked)
                sauce.likes++
            }

            // si on clique sur le bouton dislike
            if (req.body.like == -1) {
                sauce.usersDisliked.push(req.body.userId);
                sauce.dislikes++
            }

            // si on ne like ou ne dislike pas
            if (req.body.like == 0) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    sauce.usersLiked = sauce.usersLiked.filter(s => s != req.body.userId);
                    sauce.likes--
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    sauce.usersDisliked = sauce.usersDisliked.filter(s => s != req.body.userId);
                    sauce.dislikes--
                }
            }
            sauce.save()
                .then(() => res.status(201).json({ message: "avis pris en compte" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            console.error(error)
            res.status(404).json({ error })
        })
}