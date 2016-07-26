'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [ '$resource',
  function($resource) {
    return $resource('api/users/:userId', {
      userId : '@_id'
    }, {
      update : {
        method : 'PUT'
      },
      follow : {
        method : 'PUT',
        url : 'api/users/:userId/follow'
      },
      unfollow : {
        method : 'PUT',
        url : 'api/users/:userId/unfollow'
      },
      findFollowers : {
        method : 'GET',
        url : 'api/users/slug/:userSlug/followers',
        isArray : true
      },
      findFollowing : {
        method : 'GET',
        url : 'api/users/slug/:userSlug/following',
        isArray : true
      },
      findLikes : {
        method : 'GET',
        url : 'api/users/slug/:userSlug/likes',
        isArray : true
      },
      findShares : {
        method : 'GET',
        url : 'api/users/slug/:userSlug/shares',
        isArray : true
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);