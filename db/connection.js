const mongoose = require("mongoose");

const connectDB = ()=> {
    try {
        mongoose.connect(process.env.DBURI);
        console.log("connection reussir");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB();