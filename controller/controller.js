const User = require('../model/User');
const Data = require('../model/Data');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
let session=require('express-session');

const jwt_secret = process.env.JWT_SECRET;


exports.signup = async (req, res) => {
    try {
        const { name, DOB, email, aadhar, mobile, gender, pin, role } = req.body;
        let newRole=role;
        session=req.session;
        // console.log(role);
        const user = await User.findOne({ email });
        // console.log(user);
        let newUser;
        if (user) {
            return res.status(300).redirect('/login');
        }
        else {
            // console.log('here');
            if (!role) {
                newRole = 'user';
            }
            else {
                newRole = 'admin';
            }
            // console.log(newRole);
            const newPin = await bcrypt.hash(pin, 12);
            newUser = await User.create({
                name,
                DOB,
                email,
                aadhar,
                mobile,
                gender,
                pin: newPin,
                role:newRole,
            });
        }
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({ id: newUser._id, email, aadhar, mobile, role: newUser.role }, jwt_secret, {
            expiresIn: maxAge,
        });
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
        });
        session.name=name;
        session.email=email;
        session.aadhar=aadhar;
        session.mobile=mobile;
        session.role=newRole;
        res.status(201).redirect('/');
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { aadhar, username: email, pin } = req.body;
        console.log(req.body);
        let user = "";
        if (!aadhar && !email) {
            console.log('here1');
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide aadhar or email'
            });
        }
        else if (!email) {
            console.log('here2');
            user = await User.findOne({ aadhar });
        }
        else if (!aadhar) {
            console.log('here3');
            user = await User.findOne({ email });
            console.log(user);
        }
        // const user = await User.findOne({ email });
        const safePin = await bcrypt.compare(pin, user.pin);
        if (!user) {
            res.status(404).redirect('/signup');
        }
        else if(safePin){
            const maxAge = 3*60*60;
            const token = jwt.sign({
                id: user._id,
                email:user.email,
                aadhar:user.aadhar,
                mobile:user.mobile,
                role: user.role
            }, jwt_secret, {
                expiresIn: maxAge,
            });
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
            });
            session=req.session;
            session.name=user.name;
            session.email=user.email;
            session.aadhar=user.aadhar;
            session.mobile=user.mobile;
            session.role=user.role;
            res.status(200).redirect('/');
        }
        else{
            res.status(404).redirect('/login');
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.home = async (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(`${__dirname}/../public/html/Home-Field.html`));
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.addResult = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, seatNumber, declaredDate, exam, branch, resultType, totalSubject, subject, obtainedMarks, totalMarks, grade, percentile, percentage, currentBack, totalBack, spi, cpi, cgpa } = req.body;
        const newData = await Data.create({
            name,
            email,
            seatNumber,
            declaredDate,
            exam,
            branch,
            resultType,
            totalSubject,
            subject,
            obtainedMarks,
            totalMarks,
            grade,
            percentile,
            percentage,
            currentBack,
            totalBack,
            spi,
            cpi,
            cgpa,
        });
        res.status(201).json({
            status: 'success',
            data: {
                newData,
            },
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.getResult = async (req, res) => {
    try {
        session=req.session;
        console.log(session.email);
        // const data=await Data.find({email,resultType});
        res.status(200).json({
            status: 'success',
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}