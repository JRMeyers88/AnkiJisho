'use strict';

jpApp.controller("FolderController", function($scope, $window, $routeParams, WordFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated()
    .then( (user) => {
        if(user){
            currentUser = UserFactory.getUser();
            getFolders();
        }
    });

    function getFolders() {
        $scope.userFolders = [];
        WordFactory.getUserFolders()
        .then( (folderList) => {
            let userFolderData = folderList.data;
            Object.keys(userFolderData).forEach( (key) => {
                userFolderData[key].id = key;
                // console.log("folder key", userFolderData.id);
                $scope.userFolders.push(userFolderData[key]);
            });
            console.log("folders", $scope.userFolders);
        })
        .catch( (err) => {
            console.log("Error fetching folders", err);
        });
    }

    $scope.deleteFolder = (id) => {
        console.log("id", id);
        WordFactory.deleteUserFolder(id)
        .then( (data) => {
            getFolders();
        });
    };

    $scope.addToFolder = (folderId, word) => {
        word.fid = folderId;
        word.uid = currentUser;
        let addedWord = word;
        WordFactory.addWord(addedWord);
    };

});
