'use strict';

jpApp.controller("FolderController", function($scope, $window, $q, $routeParams, WordFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated()
    .then( (user) => {
        if(user){
            currentUser = UserFactory.getUser();
            getFolders();
        }
    });

    function timeSort(a, b) {
        let sortedArr = [];
        sortedArr.push(a.timestamp - b.timestamp);
        return sortedArr;
    }

    let getWordCount = (key) => {
        return $q( (resolve, reject) => {
            WordFactory.getFolderWords(key)
            .then( (words) => {
                resolve(words);
            })
            .catch( (err) => {
                console.log("error my dude", err);
            });
        });
    };

    function getFolders() {
        $scope.userFolders = [];
        WordFactory.getUserFolders()
        .then( (folderList) => {
            let userFolderData = folderList.data;
            Object.keys(userFolderData).forEach( (key) => {
                userFolderData[key].id = key;
                getWordCount(key)
                    .then( (data) => {
                        Object.size = function(obj) {
                            let size = 0, key;
                            for (key in obj) {
                                if (obj.hasOwnProperty(key))
                                    size++;
                                }
                            return size;
                        };
                        let size = Object.size(data.data);
                        userFolderData[key].count = size;
                    });
                $scope.userFolders.push(userFolderData[key]);
                $scope.userFolders.sort(timeSort).reverse();
            });
        })
        .catch( (err) => {
            console.log("Error fetching folders", err);
        });
    }


    $scope.deleteFolder = (id) => {
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
