const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config({ path: './config.env' });
let startServer;
let url=process.env.DB_URL;
url = (url.search('<password>') > -1) ? url.replace('<password>', process.env.DB_PASS) : url + "/" + process.env.DB_NAME;
if(url.indexOf(process.env.DB_NAME) === -1) {
    console.log("connected with server db");
}
else{
    console.log("connected with local db");
}

startServer = async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // console.log(url);
    console.log("Database connected");
}

module.exports = startServer;

