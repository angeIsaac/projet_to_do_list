const {Schema, model} = require("mongoose");
const validator = require("validator");
const hashedPwd = require("../../utilitaire/pwdCripter");


const userSchema = new Schema({
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
    }
}, {
    toJSON:{
        transform(doc, ret){
            delete ret.password;
            delete ret.__v;
        }
    }
})

userSchema.pre("save", async function(next) {
    if(this.isNew){
        this.password = await hashedPwd(this.password);
    }
    next();
})

module.exports =  model("users", userSchema);