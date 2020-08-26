const jwt = require('jsonwebtoken')
const promisify = require('util').promisify
const sign = promisify(jwt.sign).bind(jwt)
const verify = promisify(jwt.verify).bind(jwt)

const generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            }
        )
    } catch (err) {
        console.log(`Error generating access token: ${err}`)
        return null
    }
}
const verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey)
    } catch (err) {
        console.log(`Error verifying access token: ${err}`)
    }
}
const decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, { ignoreExpiration: true })
    } catch (err) {
        console.log(`Error decode access token: ${err}`)
    }
}
module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
}
