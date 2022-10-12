const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router
    .route('/')
    .get(controller.getAllUni)
    .post(controller.createUni);

router.route('/branch').get(controller.getAllUni);
module.exports = router;