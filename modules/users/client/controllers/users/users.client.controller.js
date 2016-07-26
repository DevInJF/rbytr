'use strict';

angular.module('users').controller('UsersController', ['$scope', '$state', 'Users', 'Authentication', '$stateParams', '$sce', 'userObject',
  function ($scope, $state, Users, Authentication, $stateParams, $sce, userObject) {
    $scope.authentication = Authentication;
    $scope.$state = $state;

    $scope.user = userObject;
    
    /**
     * findProfile
     * 
     * finds profile
     * usefull to call after (un-)following a user
     */
    $scope.findProfile = function () {
      console.log('$state', $state);
      Users.get({ userSlug: $state.params.userSlug }).$promise.then(function (results) {
        $scope.user = results;
      });
    };
    
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
        $scope.findProfile();
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
        $scope.findProfile();
      });
    };
    
    /**
     * findFollowers
     */
    var findFollowers = function () {
      console.log($state.params);
      Users.findFollowers({ userSlug: $state.params.userSlug }).$promise.then(function (results) {
        $scope.follows = results;
      });
    };
    
    /**
     * findFollowing
     */
    var findFollowing = function () {
      Users.findFollowing({ userSlug: $state.params.userSlug }).$promise.then(function (results) {
        $scope.follows = results;
      });
    };
    /**
     * findLikes
     */
    var findLikes = function () {
      $scope.posts = {};
      Users.findLikes({ userSlug: $state.params.userSlug }).$promise.then(function (results) {
        angular.forEach(results, function(value, key, obj) {
          // convert links to 'a' tags
          var regex = /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
          var content = obj[key].content.replace(regex, function(match){
            return '<a href="'+match+'" target="__blank">'+match+'</a>';
          });
          obj[key].content = $sce.trustAsHtml(content);
        });
        $scope.posts = results;
      });
    };
    
    /**
     * findShares
     */
    var findShares = function () {
      $scope.posts = {};
      Users.findShares({ userSlug: $state.params.userSlug }).$promise.then(function (results) {
        angular.forEach(results, function(value, key, obj) {
          // convert links to 'a' tags
          var regex = /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
          var content = obj[key].content.replace(regex, function(match){
            return '<a href="'+match+'" target="__blank">'+match+'</a>';
          });
          obj[key].content = $sce.trustAsHtml(content);
        });
        $scope.posts = results;
      });
    };
    
    if($state.current.name === 'users.followers') {
      findFollowers();
    }
    if($state.current.name === 'users.following') {
      findFollowing();
    }
    if($state.current.name === 'users.likes') {
      findLikes();
    }
    if($state.current.name === 'users.shares') {
      findShares();
    }
  }
]);
