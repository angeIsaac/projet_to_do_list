const authRouter = require("express").Router();
const {securityctrl: {login, register, activate}} = require("../controllers");

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/activation", activate);



module.exports = authRouter;