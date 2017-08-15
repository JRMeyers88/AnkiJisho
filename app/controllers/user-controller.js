'use strict';

jpApp.controller("UserController", function($scope, $window, UserFactory) {

  $scope.account = {
    email: "",
    password: ""
  };

  $scope.register = () => {
    UserFactory.createUser($scope.account)
    .then( (userData) => {
      $scope.login();
    });
  };

  $scope.login = () => {
    UserFactory.loginUser($scope.account)
    .then( (userData) => {
      $window.location.href = '#!/';
    });
  };



});