'use strict';

// Configuring the Posts module
angular.module('posts').run(['Menus',
  function (Menus) {
    // Add the posts dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Posts',
      state: 'posts',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown stream item
    Menus.addSubMenuItem('topbar', 'posts', {
      title: 'Stream',
      state: 'posts.list'
    });
  }
]);
