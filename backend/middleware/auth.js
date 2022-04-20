// on importe notre outil de gestion de TOKEN
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // on recupere le TOKEN dans le header "authorization" (qui est le 2eme champ)
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "voici_le_TOKEN_secret_de_la_MORT_qui_tue");
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId != userId) {
            throw "identifiant invalide";
        }
        next();
    }
    catch (error) {
        res.status(401).json({ error: error | 'requête non authentifiée' });
    }
}