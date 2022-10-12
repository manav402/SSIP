const express = require('express');
const controller = require('../controller/controller');
const debug = express.Router();
const auth = require('../auth/auth');
const User = require('../model/User');
const Data = require('../model/Data');

debug
     .route('/getAll')
     .get(async (req,res)=>{
        const data = await User.find({});
        res.status(200).json({
            status: 'success',
            data,
        });
    });

module.exports = debug;