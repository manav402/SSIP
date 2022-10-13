const express = require('express');
const app = express();
const startServer = require('./server');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./auth/auth');
const session = require('express-session');
const router = require('./routes/routes');
const debug = require('./routes/debugger');
const base = require('./routes/base');
const path = require('path');
const port = process.env.PORT;

const staticPath = path.join(__dirname, 'public');

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(session({
    secret: 'anything',
    saveUninitialized: true,
    resave: false,
}));

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
// this is not a comment
app.use('/', base);

app.use('/university', auth.uniAuth, router);

app.use('/debugging', debug);
app.use(express.static(staticPath));
app.set('view engine', 'ejs');

// added comment by manan

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

startServer();
