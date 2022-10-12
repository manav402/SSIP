const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

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
                    if (decodedToken.role === "admin") {
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
                if (decodedToken.role === "user") {
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
