const UserProfile = require('../models/UserProfile');
const Post = require('../models/Post');
const Following = require('../models/Following');
const userLogin = (req, res, next) => {
  const profile = req.body;
  const userID = profile.userID;
  UserProfile.findOne({ userID: userID })
    .then(async userprofile => {
      if (userprofile) {
        let listPostsID = [];
        let listFollowingsID = [];
        let listFollowersID = [];
        await Post.find({ 'author.authorID': userID }).then(userPosts => {
          userPosts.forEach(post => {
            listPostsID.push(post.id);
          });
        });
        await Following.findOne({ userID: userID }).then(userFollowings => {
          listFollowingsID = [...userFollowings.listFollowingsID];
        });
        //followers
        await Following.find({
          listFollowingsID: userID,
        }).then(userFollowers => {
          userFollowers.forEach(follower => {
            listFollowersID.push(follower.userID);
          });
        });
        res.send({
          profile: userprofile,
          userPosts: listPostsID,
          userFollowings: listFollowingsID,
          userFollowers: listFollowersID,
        });
      } else {
        new UserProfile({
          ...profile,
        })
          .save()
          .then(createdProfile => {
            res.send(createdProfile);
          });
        new Following({
          userID: userID,
          listFollowingsID: [],
        }).save();
      }
    })
    .catch(next);
};
const getUserInfomation = (req, res, next) => {
  const userID = req.query.userID;
  //get posts of user
  let responseData = {};
  Post.find({ 'author.authorID': userID }).then(docs => {
    responseData.ownPosts = docs;
  });
};
module.exports = {
  userLogin: userLogin,
  getUserInfomation: getUserInfomation,
};
