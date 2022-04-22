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
    userId: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

//maintenant on exporte le modele (nom_fichier, nom_schema)
module.exports = mongoose.model('Sauce', sauceSchema);
