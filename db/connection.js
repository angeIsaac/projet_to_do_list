// scripte pour se connecter a la base de donner
const mongoose = require("mongoose");

const connectDB = ()=> {
    try {
        mongoose.connect(process.env.DBURI);
        console.log("connection reussir");
    } catch (error) {
        // si la connexion a la base de donnée a echouer on retourne le message d erreur
        console.error(error.message);
        // et on arrette le processus
        process.exit(1);
    }
}

module.exports = connectDB();