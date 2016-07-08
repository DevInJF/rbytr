'use strict';

angular.module('users').controller('UsersController', ['$scope', '$state', 'Users', 'Authentication',
  function ($scope, $state, Users, Authentication) {
    $scope.authentication = Authentication;
    console.log($scope.authentication);
    var findProfile = function () {
      Users.get({ userId: $state.params.userId }).$promise.then(function (results) {
        console.log(results);
        $scope.user = results;
      });
    };
    findProfile();
    
    $scope.followedBy = function (id) {
      if ($scope.user) {
        return $scope.user.followedBy.indexOf(id) !== -1;
      }
    };
    
    /**
     * follow
     * 
     * @param {object} user - user to follow
     */
    $scope.follow = function (user) {
      Users.follow({
        userId : $state.params.userId
      }, {}, function () {
        findProfile();
      });
    };
    
    /**
     * unfollow
     * 
     * @param {object} user - user to follow
     */
    $scope.unfollow = function (user) {
      Users.unfollow({
        userId : $state.params.userId
      }, {}, function () {
        findProfile();
      });
    };
  }
]);
