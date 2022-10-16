const express = require('express')
const controller = require('../controller/controller')
const router = express.Router()
const auth = require('../auth/auth')

router.route('/create').get(auth.uniAuth,controller.getAddPages)
router.route('/addUni').get(auth.developerAuth,controller.getUni).post(auth.developerAuth,controller.createUni);
router.route('/').get(auth.uniAuth,controller.searchData).post(auth.uniAuth,controller.addData);
router.route('/addResult').post(auth.uniAuth,controller.addResult);
router.route('/Design').get(auth.uniAuth,controller.uiDesignResult).post(auth.uniAuth,controller.designResult);

// router.route('/branch').get(controller.getAllUni);
module.exports = router
