// on importe multer: notre outil de gestion des images
const { timeStamp } = require('console');
const multer = require('multer');

//ici on se fait un dictionnaire de types de fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

//pour indiquer a multer que l'on va stocker les images sur le disque
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension)
    }
});

//on exporte le tout
module.exports = multer({ storage }).single('image');