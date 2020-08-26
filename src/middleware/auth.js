const jwtVariable = require('../../variables/jwt')

const UserProfile = require('../models/UserProfile')

const { verifyToken } = require('../methods/auth')

const isAuth = async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization
    if (!accessTokenFromHeader) {
        return res.status(401).send('Access token not found!')
    }

    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret

    const verified = await verifyToken(accessTokenFromHeader, accessTokenSecret)
    if (!verified) {
        return res.status(401).send('You can not access this feature!')
    }

    UserProfile.findOne({ username: verified.payload.username }).then(
        userProfile => {
            req.userProfile = userProfile
        }
    )

    return next()
}
module.exports = isAuth
