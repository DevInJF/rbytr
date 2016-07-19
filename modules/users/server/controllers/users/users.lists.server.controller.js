'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  async = require('async'),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

var findAndPrepareUsers = function (params, callback) {
  //http://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call
  User.find(params, 'displayName provider profileImageURL following followedBy').sort('-created').exec(function (err, users) {
    if (err) {
      return callback(err);
    } else {
      async.map(users, function (user, cb){
        // Remove sensitive data
        user.salt = undefined;
        user.password = undefined;
        return cb(null, user);
      }, function (err, users) {
        return callback(null, users);
      });
    }
  });
};

/**
 * followersList
 * 
 * get a list of followers
 */
exports.followersList = function (req, res) {
  var params = {
    '_id': { 
      $in: req.profile.followedBy
    }
  };
  findAndPrepareUsers(params, function (err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(users);
    }
  });
};

/**
 * followingList
 * 
 * get a list of following
 */
exports.followingList = function (req, res) {
  var params = {
    '_id': { 
      $in: req.profile.following
    }
  };
  findAndPrepareUsers(params, function (err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(users);
    }
  });
};

/**
 * sharesList
 * 
 * get a list of shares
 */
exports.sharesList = function (req, res) {
  var params = {
    'shares': {
      $elemMatch: {
        'user': req.profile._id
      }
    }
  };
  Post.find(params).sort('-created').populate('user', 'displayName profileImageURL').exec(function (err, posts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(posts);
    }
  });
};

/**
 * likesList
 * 
 * get a list of likes
 */
exports.likesList = function (req, res) {
  var params = {
    'likes': {
      $elemMatch: {
        'user': req.profile._id
      }
    }
  };
  Post.find(params).sort('-created').populate('user', 'displayName profileImageURL').exec(function (err, posts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(posts);
    }
  });
};