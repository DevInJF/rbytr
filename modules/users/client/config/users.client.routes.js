'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('settings.invite', {
        url: '/invite',
        templateUrl: 'modules/users/client/views/settings/invite.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('authentication.invite', {
        url: '/invite',
        templateUrl: 'modules/users/client/views/authentication/invite.client.view.html'
      })
      .state('authentication.invited', {
        abstract: true,
        url: '/invited',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html',
        template: '<ui-view/>'
      })
      .state('authentication.invited.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/authentication/invite-authentication-invalid.client.view.html'
      })
      .state('authentication.invited.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/authentication/invite-authentication-success.client.view.html'
      })
      .state('authentication.invited.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/authentication/invite-authentication.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      })
//      .state('users', {
//        abstract: true,
//        url: '/users',
//        templateUrl: 'modules/users/client/views/users/user.client.view.html',
//        controller: 'UsersController'
//      })
      .state('users', {
        abstract: true,
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/users/user.client.view.html',
        resolve: {
          userObject: function ($http, $stateParams) {
            return $http.get('api/users/'+ $stateParams.userId).then(function(data) {
                console.log('resolved');
                return data.data; 
              });
          }
        },
        controller: 'UsersController'
      })
      .state('users.view', {
        url: '',
        views: {
          'list': {
            templateUrl: 'modules/posts/client/views/list-posts.client.view.html',
            controller: 'UsersController'
          }
        }
      })
      .state('users.followers', {
        url: '/followers',
        views: {
          'follows': {
            templateUrl: 'modules/users/client/views/users/follows-user.client.view.html',
            controller: 'UsersController'
          }
        }
      })
      .state('users.following', {
        url: '/following',
        views: {
          'follows': {
            templateUrl: 'modules/users/client/views/users/follows-user.client.view.html',
            controller: 'UsersController'
          }
        }
      })
      .state('users.likes', {
        url: '/likes',
        views: {
          'engagements': {
            templateUrl: 'modules/users/client/views/users/engagements-user.client.view.html',
            controller: 'UsersController'
          }
        }
      })
      .state('users.shares', {
        url: '/shares',
        views: {
          'engagements': {
            templateUrl: 'modules/users/client/views/users/engagements-user.client.view.html',
            controller: 'UsersController'
          }
        }
      });
  }
]);
