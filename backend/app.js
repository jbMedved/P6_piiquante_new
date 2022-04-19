// ici on importe express
const express = require('express');

//ici on 'appelle' express
const app = express();

//ici on import Mongoose 
// c'est un package qui facilite les interactions avec notre base de données MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jerry:OnlyP11quante@piiquante.87znc.mongodb.net/piiquante?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// on intercepte toutes les requetes contenant du json
// il nous permet ensuite d'exploiter leur corps via req.body
app.use(express.json());

// ici on fait appel au CORS pour autoriser certaines actions
// le .use est pour tout type de requetes 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// on intercepte les requetes "post" de publication des sauces
app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({ message: "objet créé" })
})

app.use((req, res, next) => {
    res.json({ message: "requete recue" });
});

//ici on exporte express pour pouvoir s'en servir dans d'autres fichiers
module.exports = app;