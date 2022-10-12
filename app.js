const express = require('express');
const app = express();
const startServer = require('./server');
const controller = require('./controller/controller');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./auth/auth');
const session = require('express-session');
const router = require('./routes/routes');
const debug = require('./routes/debugger');
const base = require('./routes/base');
const port = process.env.PORT;

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


// app.get('/login', )

// app.post('/Log-in', );

// app.get('/signup', );

// // app.post('/Sign-Up', auth.userAuth, controller.signup);
// app.post('/Sign-Up',);

// app.get('/',controller.home);

// app.post('/data', controller.addResult);

// app.get('/get-result', controller.getAllResult);
// app.post('/get-result', controller.getResult);

// app.get('/profile', auth.userAuth, (req, res) => {
//     res.status(200).sendFile(`${__dirname}/public/html/profile.html`);
// });

// app.get('/logout', controller.logout);


// app.patch('/update', auth.userAuth, controller.update);

// app.get('/search', (req, res) => {
//     res.status(200).sendFile(`${__dirname}/public/html/search.html`);
// })

app.use('/', base);

app.use('/university', router);

app.use('/debugging', debug);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

startServer();
