const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config({ path: './config.env' });
let startServer;

startServer = async () => {
    await mongoose.connect((process.env.DB_URL.search('<password>') != -1) ? process.env.DB_URL.replace('<password>', process.env.DB_PASS) : process.env.DB_URL + "/" + process.env.DB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Database connected");
}

module.exports = startServer;

