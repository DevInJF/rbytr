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
  /*
  app.route('/api/users/:userId/followers').get(users.followersList);
  app.route('/api/users/:userId/following').get(users.followingList);
  app.route('/api/users/:userId/shares').get(users.sharesList);
  app.route('/api/users/:userId/likes').get(users.likesList);
  */
  app.route('/api/users/slug/:userSlug').get(users.read);
  app.route('/api/users/slug/:userSlug/followers').get(users.followersList);
  app.route('/api/users/slug/:userSlug/following').get(users.followingList);
  app.route('/api/users/slug/:userSlug/shares').get(users.sharesList);
  app.route('/api/users/slug/:userSlug/likes').get(users.likesList);
  
  app.route('/api/createSlugs').get(users.createSlugs);
  
  app.param('userId', users.userByID);
  app.param('userSlug', users.userBySlug);
};
