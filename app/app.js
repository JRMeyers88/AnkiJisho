'use strict';

const jpApp = angular.module("JPApp", ["ngRoute"])
.constant("FirebaseUrl", "https://ankijisho.firebaseio.com");

let isAuth = (UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if (userBoolean) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

jpApp.config( ($routeProvider) => {
    $routeProvider
    .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'WordController'
    })
    .when('/log-in', {
    templateUrl: 'partials/log-in.html',
    controller: 'UserController'
    })
    .when('/practice', {
        templateUrl: 'partials/flashcard.html',
        controller: 'FlashcardController',
        resolve: {isAuth}
    })
    .when('/practice-folder/:folderId', {
        templateUrl: 'partials/folder-flashcard.html',
        controller: 'FolderFlashcardController',
        resolve: {isAuth}
    })
    .when('/create-folder', {
        templateUrl: 'partials/create-folder.html',
        controller: 'CreateFolderController',
        resolve: {isAuth}
    })
    .when('/folders', {
        templateUrl: 'partials/folders.html',
        controller: 'FolderController',
        resolve: {isAuth}
    })
    .when('/my-folder/:folderId', {
        templateUrl: 'partials/my-folder.html',
        controller: 'MyFolderController',
        resolve: {isAuth}
    })
    .when('/saved', {
        templateUrl: 'partials/saved.html',
        controller: 'SavedController',
        resolve: {isAuth}
    })
    .otherwise('/');
});

jpApp.config( ($httpProvider) => {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});