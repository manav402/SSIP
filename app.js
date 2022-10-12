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


app.get('/login',(req, res) => {
    res.status(200).sendFile(`${__dirname}/public/html/login.html`);
})

app.post('/Log-in',controller.login);

app.get('/signup', auth.adminAuth, (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/html/signup.html`);
});

app.post('/Sign-Up', auth.adminAuth, controller.signup);

app.get('/', auth.adminAuth, controller.home);

app.post('/data',controller.addResult);

app.get('/get-result',controller.getAllResult);
app.post('/get-result',controller.getResult);

app.get('/profile', auth.adminAuth, (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/html/profile.html`);
});

app.get('/logout', controller.logout);

app.patch('/update', auth.adminAuth, controller.update);

app.get('/search', (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/html/search.html`);
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});



startServer();