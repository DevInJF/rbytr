'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  mongoose = require('mongoose'),
  async = require('async'),
  User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findOne({
    _id: id
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load User ' + id));
    }

    req.profile = user;
    next();
  });
};

/**
 * User by slug
 */
exports.userBySlug = function (req, res, next, slug) {
  User.findOne({
    slugName: slug
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load User ' + slug));
    }

    req.profile = user;
    next();
  });
};

/**
 * get displayNames and insert slugNames
 */
exports.createSlugs = function (req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      async.map(users, function(user, callback){
        console.log(user.displayName);
        
        if (user.displayName) {
          // convert strings to slug
          exports.stringToSlug(user.displayName, function (err, slug) {
            
            user.slugName = slug;
            
            user.save(function (err) {
              if (err) {
                return callback(err);
              } else {
                return callback(null, user);
              }
            });
          });
        } else {
          return callback(null, user);
        }
      }, function (err, users) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(users);
        }
      });
    }
  });
};

/**
 * convert string to slug
 * http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
 */
exports.stringToSlug = function (str, callback) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  var to = 'aaaaaeeeeeiiiiooooouuuunc------';
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
  callback(null, str);
};