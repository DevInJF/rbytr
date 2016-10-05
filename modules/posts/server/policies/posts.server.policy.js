'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Posts Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/posts',
      permissions: '*'
    }, {
      resources: '/api/posts/:userSlug',
      permissions: '*'
    }, {
      resources: '/api/post/:postId',
      permissions: '*'
    }, {
      resources: '/api/post/:postId/like',
      permissions: '*'
    }, {
      resources: '/api/post/:postId/share',
      permissions: '*'
    }, {
      resources: '/api/post/:postId/comment',
      permissions: ['get', 'put']
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/posts',
      permissions: ['get', 'post']
    }, {
      resources: '/api/posts/:userSlug',
      permissions: ['get']
    }, {
      resources: '/api/post/:postId',
      permissions: ['get']
    }, {
      resources: '/api/post/:postId/like',
      permissions: ['get', 'put']
    }, {
      resources: '/api/post/:postId/share',
      permissions: ['get', 'put']
    }, {
      resources: '/api/post/:postId/comment',
      permissions: ['get', 'put']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/posts',
      permissions: ['get']
    }, {
      resources: '/api/post/:postId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Posts Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];
//  return next();
  // If an post is being processed and the current user created it then allow any manipulation
  if (req.post && req.user && req.post.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
