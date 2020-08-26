const bcrypt = require('bcrypt')
const randToken = require('rand-token')
const UserProfile = require('../models/UserProfile')
const jwtVariables = require('../../variables/jwt')
const { SALT_ROUNDS } = require('../../variables/auth')
const { generateToken, verifyToken, decodeToken } = require('../methods/auth')
const userSignup = async (req, res, next) => {
    const signupData = req.body
    const { name, username, password } = signupData
    UserProfile.findOne({ username: username })
        .then(userProfile => {
            if (!!userProfile) {
                return res.status(409).send('Username have been existed!')
            } else {
                const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS)
                const newUserProfile = {
                    name: name,
                    username: username,
                    password: hashPassword,
                    avatar: '',
                    bio: '',
                }
                new UserProfile(newUserProfile).save().then(createdUser => {
                    if (!!createdUser) {
                        return res.status(201)
                    } else {
                        return res.status(400).send('Error sign up!')
                    }
                })
            }
        })
        .catch(err => next(err))
}
const userLogin = async (req, res, next) => {
    const loginData = req.body
    const { username, password } = loginData
    UserProfile.findOne({ username: username }).then(async userProfile => {
        if (!userProfile) {
            return res.status(401).send('Username is not exist!')
        }
        const isPasswordCorrect = bcrypt.compareSync(
            password,
            userProfile.password
        )
        if (!isPasswordCorrect) {
            return res.status(401).send('Password is incorrect!')
        }
        const accessTokenLife =
            process.env.ACCESS_TOKEN_LIFE || jwtVariables.accessTokenLife
        const accessTokenSecret =
            process.env.ACCESS_TOKEN_SECRET || jwtVariables.accessTokenSecret
        const dataForAccessToken = {
            username: userProfile.username,
        }
        const accessToken = await generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife
        )
        if (!accessToken) {
            return res.status(401).send('Log in failed, please try again..')
        }
        let refreshToken = randToken.generate(jwtVariables.refreshTokenSize)
        if (!userProfile.refreshToken) {
            //not have refresh token yet
            await UserProfile.update(
                { username: userProfile.username },
                { $set: { refreshToken: refreshToken } }
            )
        } else {
            refreshToken = userProfile.refreshToken
        }
        return res.json({
            accessToken,
            refreshToken,
        })
    })
}
module.exports = {
    userSignup: userSignup,
    userLogin: userLogin,
}
