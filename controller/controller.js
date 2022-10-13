const User = require('../model/User');
const Data = require('../model/Data');
const Uni = require('../model/Uni');
const Collage = require('../model/Collage');
const Program = require('../model/Program');
const Branch = require('../model/Branch');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
let session = require('express-session');

const jwt_secret = process.env.JWT_SECRET;


exports.signup = async (req, res) => {
    try {
        const { name, DOB, email, aadhar, mobile, gender, pin, role, university_code } = req.body;
        let newRole = role;
        session = req.session;
        // console.log(role);
        const user = await User.findOne({ email });
        // console.log(user);
        let newUser;
        if (user) {
            // return res.status(300).redirect('/login');
            return res.status(300).json({
                status: 'fail',
                message: 'Email already exist'
            });
        }
        else {
            // console.log('here');
            if (!role) {
                newRole = 'user';
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
                role: newRole,
                university_code
            });
        }
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({ id: newUser._id, email, aadhar, mobile, role: newUser.role, university_code }, jwt_secret, {
            expiresIn: maxAge,
        });
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
        });
        session.name = name;
        session.email = email;
        session.aadhar = aadhar;
        session.mobile = mobile;
        session.role = newRole;
        session.university_code = university_code;
        // res.status(201).redirect('/');
        res.status(201).json({
            status: 'success',
            message: 'Record created successfully'
        });
    } catch (err) {
        res.status(501).render('error', { errorCode: 404, errorMessage: err });
    }
}

exports.login = async (req, res) => {
    try {
        const { aadhar, username: email, pin, university_code } = req.body;
        console.log(req.body);
        let safePin = false;
        let user = "";
        if (!aadhar && !email) {
            // console.log('here1');
            return res.status(400).render(
                'login',
                { errorOnLogin: 'Please provide aadhar or email', errorThere: true });
        }
        if (!pin) {
            // console.log('here1');
            return res.status(400).render(
                'login',
                { errorOnLogin: 'Please provide password !!', errorThere: true });
        }
        else if (email && aadhar) {
            // console.log('here2');
            user = await User.findOne({ aadhar });
            console.log(user.role);
        }
        else if (!aadhar) {
            // console.log('here3');
            user = await User.findOne({ email });
            console.log(user.role);
        }
        else if (!email) {
            // console.log('here4');
            user = await User.findOne({ aadhar });
            console.log(user.role);
        }
        // const user = await User.findOne({ email });
        if (!user) {
            res.status(404).render('signup');
            return;
        }
        else {
            safePin = await bcrypt.compare(pin, user.pin);
        }
        if (safePin) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                aadhar: user.aadhar,
                mobile: user.mobile,
                role: user.role,
                university_code: user.university_code
            }, jwt_secret, {
                expiresIn: maxAge,
            });
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
            });
            session = req.session;
            session.name = user.name;
            session.email = user.email;
            session.aadhar = user.aadhar;
            session.mobile = user.mobile;
            session.role = user.role;
            session.university_code = user.university_code;
            if (user.role === 'admin') {
                res.status(200).render('search');
            }
            else if (user.role === 'dev') {
                res.status(400).render({
                    status: 'success',
                    message: 'hmm devloper it seems and login through ui shame on you and your degree 😑😑😑'
                });
            }
            else if (user.role === 'uni') {
                const university = await Uni.findOne({ university_code });
                console.log(university);
                if (!university) {
                    res.status(404).render('login', {
                        message: 'wait what !! imposible we are hacked it seems, help a hecker !!!'
                    });
                    return;
                }
                else {
                    session.university_code = university.u_code;
                    res.status(200).json( {
                        message: `ahh , boss itself you are authorised for this ${university.u_name} university only 😑`
                    });
                }
            }
            else {
                // res.status(200).redirect('/');
                res.status(200).redirect('/');
            }
        }
        else {
            // res.status(404).redirect('/login');
            res.status(501).render('error', { errorCode: 404, errorMessage: err });

        }
    } catch (err) {
        res.status(501).render('error', { errorCode: 404, errorMessage: err });

    }
}

exports.home = async (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(`${__dirname}/../public/html/home.html`));
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.addResult = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, aadharNumber, university, year, email, seatNumber, declaredDate, exam, branch, resultType, totalSubject, subject, obtainedMarks, totalMarks, grade, percentile, percentage, currentBack, totalBack, spi, cpi, cgpa } = req.body;
        const newData = await Data.create({
            name,
            aadharNumber,
            university,
            year,
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

exports.getAllResult = async (req, res) => {
    try {
        session = req.session;
        let email = session.email;
        const { type: resultType } = req.query;
        const data = await Data.find({ email, resultType });
        // console.log(data);
        res.status(200).json({
            status: 'success',
            data: {
                data,
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}
exports.getResult = async (req, res) => {
    try {
        session = req.session;
        let data = req.body;
        let aadhar = session.aadhar;
        // console.log(data,aadhar);
        let finalData = await Data.find({ aadharNumber: aadhar, university: data.university, seatNumber: data.seatNumber, branch: data.branch, year: data.year });
        res.status(200).json({
            status: 'success',
            data: {
                data: finalData,
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.logout = async (req, res) => {
    try {
        session = req.session;
        session.destroy();
        res.redirect('/login');
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.update = async (req, res) => {
    try {
        const session = req.session;
        const email = session.email;
        const data = await User.findOneAndUpdate({ email }, req.body, {
            new: true,
            runValidators: true,
        });
        session.name = data.name;
        session.email = data.email;
        session.aadhar = data.aadhar;
        session.mobile = data.mobile;
        session.role = data.role;
        res.status(200).json({
            status: 'success',
            data: {
                data,
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.getAllUni = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: "All list of universities",
    });
}

exports.createUni = async (req, res) => {
    try {
        const data = req.body;
        const fill = await Uni.create(data);
        res.status(200).json({
            status: 'success',
            message: "University Added Successfuly",
            data: fill,
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.getUni = async (req, res) => {
    try {
        const session = req.session;
        const university_code = session.university_code;
        const data = await Uni.find({ university_code });
        res.status(200).json({
            status: 'success',
            data: {
                data,
            },
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.searchData = async (req,res)=>{
    try{
        const query = req.query;
        console.log(query);
        const {u_code,branch_id,collage_id,pro_id}=req.query;
        let data="null";
        if(branch_id){
            data= await Branch.find(req.query);
        }
        else if(collage_id && !branch_id){
            delete req.query.pro_id;
            data = await Collage.find(req.query);
        }
        else if(!collage_id && pro_id){
            data= await Program.find({u_code,branch_id});
        }
        else if(!branch_id){
            data = await Uni.find({university_code:u_code});
        }
        res.status(200).json({
            status: 'success',
            message: 'found',
            data
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.addData = async(req,res)=>{
    try{
        const { u_code, branch_id, collage_id, pro_id }=req.body;
        let data="null";
        if(branch_id){
            data=Branch.create(req.body);
        }
        else if(collage_id){
            data=Collage.create(req.body);
        }
        else if(pro_id){
            data = Program.create(req.body);
        }
        else if(u_code){
            data=Uni.create(req.body);
        }
        res.status(200).json({
            status: 'ok',
            message: 'success',
            data
        });
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message:err.message,
        })
    }
}