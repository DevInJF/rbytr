'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  async = require('async'),
  User = mongoose.model('User');

/**
 * Read user data
 */
exports.read = function (req, res) {
  var profile = req.profile;
  // Remove sensitive data before login
  profile.password = undefined;
  profile.salt = undefined;
  res.json(profile);
};

/**
 * Update user details
 */
exports.update = function (req, res) {
  // Init Variables
  var user = req.user;

  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  if (user) {
    // Merge existing user
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.displayName = user.firstName + ' ' + user.lastName;

    user.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.login(user, function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(user);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Update profile picture
 */
exports.changeProfilePicture = function (req, res) {
  var user = req.user;
  var message = null;
  var upload = multer(config.uploads.profileUpload).single('newProfilePicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  
  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  if (user) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        user.profileImageURL = config.uploads.profileUpload.dest + req.file.filename;

        user.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Send User
 */
exports.me = function (req, res) {
  res.json(req.user || null);
};

/**
 * Follow a user
 */
exports.follow = function (req, res) {
  exports.initFollowing();
  var user = req.user;
  var userToFollow = req.params.userId;
  var followedUser = req.profile;
  user.following.push(userToFollow);
  // save document of following user
  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
   // save document of followed user
//      followedUser.followedBy.push(req.user._id);
      followedUser.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(userToFollow);
        }
      });
    }
  });
};

/**
 * Unfollow a user
 */
exports.unfollow = function (req, res) {
  var user = req.user;
  var userToUnfollow = req.profile;
  var indexUser = user.following.indexOf(req.params.userId);
  var indexUserToUnfollow = userToUnfollow.followedBy.indexOf(req.user._id);
  
  if (indexUser > -1) {
    user.following.splice(indexUser, 1);
  }
  if (indexUserToUnfollow > -1) {
    userToUnfollow.followedBy.splice(indexUserToUnfollow, 1);
  }
  
  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      
      userToUnfollow.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(userToUnfollow);
        }
      });
    }
  });
};
/**
 * Initial following
 * 
 * to be removed
 * 
 * everyone follows rbytr, rbytr follows everyone
 */
exports.initFollowing = function () {
  var rbytrId = '576530cbac09993c1fb7e307';
  var following = [];
  following.push(rbytrId);
  User.update({}, { following: following, followedBy: following }, { multi: true }, function(err) {
    if (err) {
      console.log(err);
    }
  });
  
  var userIds = [];
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log(err); 
    } else {
      async.forEachOf(users, function (value, key, callback) {
        console.log(value._id);
        userIds.push(value._id);
        return callback(null);
      }, function (err) {
        if (err) {
          console.log(err);
        } else {
          
          var rbytrId = '576530cbac09993c1fb7e307';
          User.findById(rbytrId).exec(function (err, rbytrUser) {
            if (err) {
              console.log(err);
            } else if (!rbytrUser) {
              console.log('No user with that identifier has been found');
            }
            
            rbytrUser.following = userIds;
            rbytrUser.followedBy = userIds;
            
            rbytrUser.save(function(err) {
              if (err) {
                console.log(err); 
              }
            });
          });
        }
      });
    }
  });
};

/**
 * User middleware
 */
exports.userByUserId = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.status(404).send({
        message: 'No user with that identifier has been found'
      });
    }
//    req.following = user;
    next();
  });
};