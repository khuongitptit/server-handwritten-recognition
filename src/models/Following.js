const mongoose = require('mongoose')

const FollowingSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    listFollowingsID: {
        type: [String],
        required: true,
    },
})
const Following = mongoose.model('followings', FollowingSchema)
module.exports = Following
