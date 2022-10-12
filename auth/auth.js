const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

exports.devloperAuth = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            const decoded = jwt.verify(req.cookies.jwt, jwt_secret, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Unauthorized',
                    })
                }
                else {
                    if (decodedToken.role !== "dev") {
                        return res.status(401).json({
                            status: 'fail',
                            message: 'You are not authorized to access this page'
                        })
                    }
                    else {
                        next();
                    }
                }
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        })
    }
}

exports.uniAuth = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            const decoded = jwt.verify(req.cookies.jwt, jwt_secret, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Unauthorized',
                    })
                }
                else {
                    if (decodedToken.role !== "university") {
                        return res.status(401).json({
                            status: 'fail',
                            message: 'You are not authorized to access this page'
                        })
                    }
                    else {
                        next();
                    }
                }
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        })
    }
}

exports.adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, jwt_secret, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({
                        status: 'fail',
                        message: 'You are not authorized to access this page'
                    })
                }
                else {
                    if (decodedToken.role !== "admin") {
                        return res.status(401).json({
                            status: 'fail',
                            message: 'You are not authorized to access this page'
                        })
                    }
                    else {
                        next();
                    }
                }
            })
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
}

exports.userAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwt_secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'You are not authorized to access this page'
                })
            }
            else {
                if (decodedToken.role !== "user") {
                    return res.status(401).json({
                        status: 'fail',
                        message: 'You are not authorized to access this page'
                    })
                }
                else {
                    next();
                }
            }
        })
    } else {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not authorized to access this page,no token available'
        })
    }
}
