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