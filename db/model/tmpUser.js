const {Schema, model} = require("mongoose");
const validator = require("validator");
const hashedPwd = require("../../utilitaire/pwdCripter");
const { getRandomValues } = require("crypto");
const generateToken = require("../../utilitaire/generateToken");


const tmpUserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer
    },
    active:{
        type: Boolean,
        required: true,
        default: false
    },
    token:{
        type: String
    },
    // pour specifier le temp d'expiration
    createdAt: {type: Date, 
        default: Date.now, 
        expires: '600s'
    }
})

tmpUserSchema.pre("save", async function(next) {

    if(this.isNew){
        this.password = await hashedPwd(this.password);
        this.token = await generateToken();
    }
    next();
})


module.exports =  model("tmpUsers", tmpUserSchema);