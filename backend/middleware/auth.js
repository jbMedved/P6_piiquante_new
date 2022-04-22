// on importe notre outil de gestion de TOKEN
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // on recupere le TOKEN dans le header "authorization" (qui est le 2eme champ)
        //console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        //console.log(token);
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //console.log(decodedToken);
        const userId = decodedToken.userId;
        //console.log(userId);
        req.auth = { userId };
        //console.log(req.auth);
        if (req.body.userId && req.body.userId != userId) {
            throw "identifiant invalide";
        }
        //console.log(req)
        //console.log(req.body)
        next();

    }
    catch (error) {
        res.status(401).json({ error: error | 'requête non authentifiée' });
    }
}