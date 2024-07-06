const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;
// fonction pour s'authentifier
const authenticate = (req, res, next) => {
    // on verifie s'il existe un token
    // dans le cas ou le token n'existe pas on retourne un message 
    const accessToken = req.headers["authorization"];
    if(!accessToken){
        return res.status(401).json("acces refusé, token inexistant ou non reconue");
    }
    // si le token existe on procede a sa verification
    try {
        // on verifie si le token est valide
        const decode = jwt.verify(accessToken, secret_key);
        req.user = decode.userId;
        next();
    } catch (error) {
        // dans le cas contraire on retourne un message
        return res.status(400).json("token invalide");
    }
}


module.exports = authenticate;