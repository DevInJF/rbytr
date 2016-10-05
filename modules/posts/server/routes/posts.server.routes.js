'use strict';

/**
 * Module dependencies.
 */
var postsPolicy = require('../policies/posts.server.policy'),
  posts = require('../controllers/posts.server.controller');

module.exports = function (app) {

  // Post routes
  app.route('/api/posts').all(postsPolicy.isAllowed)
    .get(posts.list)
    .post(posts.create);

  // Posts by user routes
  app.route('/api/posts/:userSlug').all(postsPolicy.isAllowed)
    .get(posts.list);

  // Single post routes
  app.route('/api/post/:postId').all(postsPolicy.isAllowed)
    .get(posts.read)
    .put(posts.update)
    .delete(posts.delete);

  // Like or unlike a post
  app.route('/api/post/:postId/like').all(postsPolicy.isAllowed)
    .get(posts.read)
    .put(posts.like);

  // Share or unshare a post
  app.route('/api/post/:postId/share').all(postsPolicy.isAllowed)
    .get(posts.read)
    .put(posts.share);

  // Comment or uncomment a post
  app.route('/api/post/:postId/comment').all(postsPolicy.isAllowed)
    .get(posts.read)
    .put(posts.comment);

  // Finish by binding the post middleware
  app.param('postId', posts.postByPostId);
  app.param('userId', posts.userByID);
  app.param('userSlug', posts.userBySlug);
};
