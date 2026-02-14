const mongoose = require("mongoose");
const DB_CONNECTION = process.env.DB_CONNECTION;


const connectDB = async () => {
    try {
        await mongoose.connect(DB_CONNECTION);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;