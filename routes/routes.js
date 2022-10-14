const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();
const auth = require('../auth/auth');
router
    .route('/create')
    .get(controller.getAllUni)
    .post(controller.createUni);

router
    .route('/')
    .get(controller.searchData)
    .post(controller.addData);
    
router.route('/branch').get(controller.getAllUni);
module.exports = router;