const {login: connexion, createAccount, activation} = require("../service/securityService");

const login = async (req, res) => {
    const {email, password} = req.body;
    const result = await connexion({email, password});
    if(result.data){
        const {refreshToken, accessToken} = result.data 
        return res.cookie("refreshToken", refreshToken)
            .header("Authorization", accessToken)
            .status(result.status)
            .json({...result});
    }
    return res.status(result.status).json({...result});
}

const register = async (req, res) => {
    const {body} = req
    const result = await createAccount(body)
    res.status(result.status).json({...result})
}

const activate = async (req, res) => {
    const {token, userId} = req.body;
    const result = await activation({token, userId});
    res.status(result.status).json({...result})
}

module.exports = {
    login,
    register,
    activate
}