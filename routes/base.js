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
        res.status(200).sendFile(path.resolve(`${__dirname}/../public/html/login.html`));
    })
    .post(controller.login);

base.route('/signup')
    .get((req, res) => {
        res.status(200).sendFile(path.resolve(`${__dirname}/../public/html/signup.html`));
    })
    .post(controller.signup);

base.route('/')
    .get(controller.home)

base.route('/profile')
    .get((req, res) => {
        res.status(200).sendFile(path.resolve(`${__dirname}/../public/html/profile.html`));
    })

base.route('/logout')
    .get(controller.logout)

base.route('/update')
    .patch(controller.update)

base.route('/search')
    .get((req, res) => {
        res.status(200).sendFile(path.resolve(`${__dirname}/../public/html/search.html`));
    });


module.exports = base;