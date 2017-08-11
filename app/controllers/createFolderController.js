'use strict';

jpApp.controller("CreateFolderController", function($scope, $window, $routeParams, WordFactory, UserFactory) {

    $scope.formTitle = "Create Folder";
    $scope.createFolder = {
        uid: UserFactory.getUser(),
        title: "",
        id: ""
    };

    $scope.saveFolder = () => {
        WordFactory.addFolder($scope.createFolder)
        .then( (data) => {
            $window.location.href = '#!/folders';
            console.log("data", data);
        });
    };

});