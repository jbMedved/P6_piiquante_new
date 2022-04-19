// on importe mongoose
const mongoose = require('mongoose');

// on utilise le schema mongoose
const sauceSchema = mongoose.Schema({
    //ici on va definir les champs utilisés
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: ["String <userId>"], required: true }, //a corriger pour faire correspondre aux likes
    usersDisliked: { type: ["String <userId>"], required: true }, //a corriger pour faire correspondre aux dislikes
});

//maintenant on exporte le modele (nom_fichier, nom_schema)
module.exports = mongoose.model('Sauce', sauceSchema);