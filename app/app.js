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
    // .when('/', {
    // templateUrl: 'partials/home.html',
    // controller: 'WordController'
    // })
    .when('/log-in', {
    templateUrl: 'partials/log-in.html',
    controller: 'UserController'
    })
    .otherwise('/');
});