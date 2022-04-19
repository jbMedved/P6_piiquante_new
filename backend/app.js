// ici on importe express
const express = require('express');

//ici on 'appelle' express
const app = express();

//ici on importe notre router
const saucesRoutes = require('./routes/sauces');

//ici on importe Mongoose 
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

// ici on indique que le chemin /api/sauces sera la racine dans sauces.js du dossier routes
app.use('/api/sauces', saucesRoutes)

//ici on exporte express pour pouvoir s'en servir dans d'autres fichiers
module.exports = app;