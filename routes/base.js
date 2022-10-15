const express = require('express');
const app = express();
const controller = require('../controller/controller');
const base = express.Router();
const auth = require('../auth/auth');
const bodyParser = require('body-parser');
const path = require('path');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

base.route('/login')
    .get((req, res) => {
        // res.status(200).sendFile(path.resolve(`${__dirname}/../public/html/login.html`));
        res.status(200).render('login', { errorThere: false });
    })
    .post(controller.login);

base.route('/get-result')
    .get(controller.fetchResult)
    .post(controller.fetchResult);

base.route('/signup')
    .get(auth.userAuth,(req, res) => {
        res.status(200).render('signup',{errorThere:false});    
    })
    .post(auth.userAuth,controller.signup);

base.route('/')
    .get(auth.userAuth,controller.home);

base.route('/profile')
    .get(auth.userAuth,controller.profile)
    .patch(auth.userAuth,controller.updateProfile);

base.route('/logout')
    .get(controller.logout)

base.route('/search')
    .get(auth.notUni,(req, res) => {
        res.status(200).render('search');
    });


module.exports = base;