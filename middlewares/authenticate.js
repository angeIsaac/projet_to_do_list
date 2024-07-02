const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const accessToken = req.headers["authorization"];
    if(!accessToken){
        return res.status(401).json("acces refusé, token inexistant ou non reconue");
    }
    try {
        const decode = jwt.verify(accessToken, secret_key);
        req.user = decode.userId;
        next();
    } catch (error) {
        return res.status(400).json("token invalide");
    }
}


module.exports = authenticate;