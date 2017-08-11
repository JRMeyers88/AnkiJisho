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
        let userFolderArr = [];
        WordFactory.getUserFolders()
        .then( (folderList) => {
            let userFolderData = folderList.data;
            // console.log("user folder data", folderList);
            Object.keys(userFolderData).forEach( (key) => {
                userFolderData[key].id = key;
                userFolderArr.push(userFolderData[key]);
            });
            $scope.userFolders = userFolderArr;
        })
        .catch( (err) => {
            console.log("Error fetching folders", err);
        });
    }

    $scope.getFolder = function(folderId) {
        let folderArr = [];
        WordFactory.getFolder(folderId)
        .then( (folderList) => {
            let folderData = folderList.data;
            $scope.folders = folderData;
        })
        .catch( (err) => {
            console.log("error my dude", err);
        });
    };

    $scope.addToFolder = (folderId, word) => {
        word.uid = currentUser;
        word.fid = folderId;
        let addedWord = word;
        WordFactory.addWord(addedWord);
    };

});
