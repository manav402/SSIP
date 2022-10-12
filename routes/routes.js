const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();
const auth = require('../auth/auth');
router
    .route('/')
    .get(controller.getAllUni)
    .post(auth.developerAuth,controller.createUni);

router.route('/branch').get(controller.getAllUni);
module.exports = router;