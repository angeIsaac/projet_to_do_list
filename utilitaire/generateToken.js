const crypto = require("crypto");
const bcrypt = require("bcrypt");

const generateToken = async () => {

    const salt = await bcrypt.genSalt(10);
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, salt);
    return hash
}

module.exports = generateToken;