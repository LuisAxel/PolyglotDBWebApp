const mongoose = require('mongoose');

const dbconnect = async () => {
    console.log("Connecting to MongoDB....");
    try {
        await mongoose.connect("mongodb://localhost:27017/diagramas");
        console.log("MongoDB cluster connection successful");
    } catch (err) {
        console.error("Connection error", err);
    }
}

module.exports = dbconnect;
