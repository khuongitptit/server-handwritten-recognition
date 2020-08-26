const mongoose = require('mongoose')

const UserProfileSchema = new mongoose.Schema({
    userID: String,
    name: String,
    username: String,
    password: String,
    avatar: String,
    bio: String,
    accessToken: String,
    refreshToken: String,
})
const UserProfile = mongoose.model('userprofiles', UserProfileSchema)
module.exports = UserProfile
