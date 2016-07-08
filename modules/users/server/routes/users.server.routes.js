'use strict';

/**
 * Module dependencies.
 */
var usersPolicy = require('../policies/users.server.policy'),
  users = require('../controllers/users.server.controller');

module.exports = function (app) {

  // Setting up the users profile api
  app.route('/api/users').put(users.update);
  app.route('/api/users/me').get(users.me);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);
  app.route('/api/users/:userId').get(users.read);
  app.route('/api/users/:userId/follow').put(users.follow);
  app.route('/api/users/:userId/unfollow').put(users.unfollow);
  
  /*??*/
  app.param('userId', users.userByUserId);
};
