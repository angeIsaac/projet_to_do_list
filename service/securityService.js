const jwt  = require("jsonwebtoken");
const {userRepo: {findOne, create}} = require("../db/repository");
const bcrypt = require("bcrypt");
const {tmpUser} = require("../db/model")
const sendEmail = require("../utilitaire/email/sendEmail")


const secret = process.env.JWT_SECRET;
const expiresIn = process.env.TOKEN_EXPIRY


//  fonction pour se connecter a son compte
const login = async ({email, password}) => {
    // verifier si l'email existe dans la base de donnée
    const connectingUser = await findOne({email});
    if(!connectingUser){
        return {status: 401, message: "email est introuvable", data: null}
    }
    // cmparer si le mot de passe est valide
    const isPasswordValid = await bcrypt.compare(password, connectingUser.password);
    if(!isPasswordValid){
        return {status: 401, message: "mot de passe invalide", data: null};
    }
    // creation de token et de refresh token
    try {
        const accessToken = jwt.sign({userId: connectingUser._id}, secret, {expiresIn})
        const refreshToken = jwt.sign({userId: connectingUser._id}, secret, {expiresIn: "7d"})
        return {status: 200, message: "connexion reussie", data: {accessToken, refreshToken}}
    } catch (error) {
        return {message: "error server"};
    }
}

// fonction pour s'enregistrer dans la base de donnée

const createAccount = async userData => {
    const {email} = userData;
    // on verifie si l'email existe dans la base de donnée
    const user = await findOne({email});
    if(user){
        return {status: 422, message: "ce compte existe deja", data: null}
    } 

    // on verifie si il y a pas une creation en cour
    const existingtmpUser = await tmpUser.findOne({email});
    if(existingtmpUser){
        return {status: 422, message: `un proccessus de creation est deja en cour pour l'email: ${email}, veiller patienter 10mn avant de reprendre`, data: null}
    }

    //  on enregistre un utilsateur dans une collection temporaire et on procede a l'activation de son compte 
    try {
        const newUser = await (new tmpUser(userData)).save();
        // le lien de la page qui va nous qui va verifier son activation
        const link =` ${process.env.URL_PROTOCOL}://${process.env.CLIENT_URL}${process.env.ACTIVATION_PATH}?token=${newUser.token}&id=${newUser._id}`;
        const payload = {name: newUser.name, link}
        // l'envoie de l'email
        const result = await sendEmail(newUser.email, "Verification d'email", payload, "./template/emailVerification.handlebars")
        return {status: 200, message: "creation reussie", data:{...result}}
    } catch (error) {
        return {status: 500, message: "erreur serveur", data: null}
    }
}

// fonction d'activation du compte 
const activation = async (payload) => {
    const {token, userId} = payload;
    const user = await tmpUser.findById(userId);
    if(!user){
        return {status: 401, message: "votre token a inexistant", data: null};
    }
    if(token !== user.token){
        return {status: 401, message: "votre lien d'activation est invalide", data: null}
    }
    try {
        const {__v, token, _id, ...rest} = user.toJSON();
        const existingUser = await findOne({_id});
        if(!existingUser){
            const newUser = await create({...rest, active: true});
            return {status: 200, message: "votre compte a ete creer avec succes", data: newUser}
        }else{
            return {status: 200, message: "le compte est deja existant", data: existingUser}
        }
    } catch (error) {
        return {status: 401, message: error.message, data: null}
    }
}

module.exports = {
    login,
    createAccount,
    activation
}