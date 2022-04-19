const mongoose = require('mongoose');
// ici on importe un utilitaire qui va nous gararntir que chaque email correspond a un unique utilisateur
// (pas possible d'avoir plusieurs comptes avec la meme adresse mail)
const uniqueValidator = require('mongoose-unique-validator');

// ici on crée le schéma d'identification
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// on applique notre utilitaire au schema avant export
userSchema.plugin(uniqueValidator);

// et ici on l'exporte
module.exports = mongoose.model('User', userSchema);