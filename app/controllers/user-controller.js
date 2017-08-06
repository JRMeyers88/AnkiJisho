'use strict';

jpApp.controller("UserController", function($scope, $window, UserFactory) {

  $scope.account = {
    email: "",
    password: ""
  };

  $scope.register = () => {
    console.log("you clicked register");
    UserFactory.createUser($scope.account)
    .then( (userData) => {
      console.log("New User!", userData);
      $scope.login();
    });
  };

  $scope.login = () => {
    UserFactory.loginUser($scope.account)
    .then( (userData) => {
      console.log("userData", userData);
      $window.location.href = '#!/';
    });
  };



});