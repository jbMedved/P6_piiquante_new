// on importe notre outil de cryptage de données de comptes
const bcrypt = require('bcrypt');

//on importe notre outil de gestion des tokens
const jwt = require('jsonwebtoken');

// on importe notre modele de compte utilisateur
const User = require('../models/User');

// pour la création de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "utilisateur créé" }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

// pour la connexion d'utilisateurs existants
exports.login = (req, res, next) => {
    //on recherche si l'email est dans notre base
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "utilisateur inexistant" })
            }
            // si l'email existe alors on va comparer les mots de passe
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "mot de passe erroné" })
                    }
                    // si le mot de passe est bon, alors on lui attribue un TOKEN (ou jeton)
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            // 1er argument : l'identifiant
                            { userId: user._id },
                            //2eme argument : la clé d'encodage
                            'RANDOM_TOKEN_SECRET',
                            // 3eme argument : configuration
                            { expiresIn: '24h' }
                        )



                    })
                })
                .catch((error => res.status(500).json({ error })));
        })
        .catch(error => res.status(500).json({ error }))
};
