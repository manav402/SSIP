const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const startServer = require('./server');
const controller = require('./controller/controller');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./auth/auth');
const session = require('express-session');
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(session({ 
    secret: 'anything',
    saveUninitialized: true,
    resave: false,
}));


// app.use(cookieParser());



app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// app.use(express.json());


app.get('/login', (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/html/login.html`);
})

app.post('/Log-in', controller.login);

app.get('/signup', auth.userAuth, (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/html/SignUpPage.html`);
});

app.post('/Sign-Up', auth.userAuth, controller.signup);

app.get('/', auth.userAuth, controller.home);

app.post('/data', auth.adminAuth, controller.addResult);

app.get('/get-result', controller.getResult);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});



startServer();