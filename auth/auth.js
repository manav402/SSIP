const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET

exports.developerAuth = async (req, res, next) => {
  try {
    console.log('here')
    if (req.cookies.jwt) {
      const decoded = jwt.verify(
        req.cookies.jwt,
        jwt_secret,
        (err, decodedToken) => {
          if (err) {
            return res.status(401).json({
              message: 'Unauthorized',
            })
          } else {
            if (decodedToken.role !== 'dev') {
                        return res.status(401).render('error', {errorCode:100, errorMessage:"Even if you are developer we not even think about you get some life dude!!!"});

            } else {
              next()
            }
          }
        },
      )
    } else {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized you silly duck...',
      })
    }
  } catch (err) {
    res.status(500).render('error', { errorCode: 404, errorMessage: err })
  }
}

exports.uniAuth = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      jwt.verify(req.cookies.jwt, jwt_secret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            message: 'Unauthorized',
          })
        } else {
          if (decodedToken.role !== 'uni') {
                      return res.status(401).render('error', {errorCode:100, errorMessage:"'Hey Dude! We dont need you here this is not for you not! Go home...!!!',"});

          } else {
            next()
          }
        }
      })
    }
  } catch (err) {
    res.status(500).render('error', { errorCode: 404, errorMessage: err })
  }
}

exports.adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwt_secret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            status: 'fail',
            error: err,
            message: 'admin ☕ 😂...💥😂...💥😂',
          })
        } else {
          if (decodedToken.role !== 'admin') {
            return res
              .status(401)
              .render('error', { errorCode: 100, errorMessage: 'not a admin dude get some jobs you lazy!!' });
          } else {
            next()
          }
        }
      })
    }
  } catch (err) {
    res.status(500).render('error', { errorCode: 404, errorMessage: err })
  }
}

exports.userAuth = async (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwt_secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          status: 'fail',
          message: 'You are not authorized to access this page',
        })
      } else {
        if (decodedToken.role !== 'user') {
          return res
            .status(401)
            .render('error', { errorCode: 100, errorMessage: "hmm you can't even access users page" });
        } else {
          next()
        }
      }
    })
  } else {
    return res.status(401).redirect('/login')
  }
}

exports.notUni = async (req,res,next)=>{
  try {
    if (req.cookies.jwt) {
      jwt.verify(req.cookies.jwt, jwt_secret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            message: 'Unauthorized',
          })
        } else {
          if (decodedToken.role === 'uni') {
                      return res.status(401).render('error', {errorCode:100, errorMessage:"'Hey Dude! We dont need you here this is not for you not! Go home...!!!',"});

          } else {
            next()
          }
        }
      })
    }
  } catch (err) {
    res.status(500).render('error', { errorCode: 404, errorMessage: err })
  }
}

exports.notAdmin = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      jwt.verify(req.cookies.jwt, jwt_secret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            message: 'Unauthorized',
          })
        } else {
          if (decodedToken.role === 'admin') {
                      return res.status(401).render('error', {errorCode:100, errorMessage:"'Hey Dude! We dont need you here this is not for you not! Go home...!!!',"});

          } else {
            next()
          }
        }
      })
    }
  } catch (err) {
    res.status(500).render('error', { errorCode: 404, errorMessage: err })
  }
}

exports.notUser = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      jwt.verify(req.cookies.jwt, jwt_secret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            message: 'Unauthorized',
          })
        } else {
          if (decodedToken.role === 'user') {
                      return res.status(401).render('error', {errorCode:100, errorMessage:"'Hey Dude! We dont need you here this is not for you not! Go home...!!!',"});

          } else {
            next()
          }
        }
      })
    }
  } catch (err) {
    res.status(500).render('error', { errorCode: 404, errorMessage: err })
  }
}

exports.notDev=async (req, res,next)=>{
  try {
    if (req.cookies.jwt) {
      jwt.verify(req.cookies.jwt, jwt_secret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            message: 'Unauthorized',
          })
        } else {
          if (decodedToken.role === 'dev') {
                      return res.status(401).render('error', {errorCode:100, errorMessage:"'Hey Dude! We dont need you here this is not for you not! Go home...!!!',"});

          } else {
            next()
          }
        }
      })
    }
  } catch (err) {
    res.status(500).render('error', { errorCode: 404, errorMessage: err })
  }
}
