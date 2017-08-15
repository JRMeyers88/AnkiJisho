'use strict';

jpApp.controller("MyFolderController", function($scope, WordFactory, $routeParams, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated()
    .then( (user) => {
        if(user){
            currentUser = UserFactory.getUser();
            getFolderWords();
        }
    });

    function getFolderWords() {
        $scope.folderWords = [];
        WordFactory.getFolderWords($routeParams.folderId)
        .then( (wordList) => {
            let folderWordData = wordList.data;
            Object.keys(folderWordData).forEach( (key) => {
                folderWordData[key].fwid = key;
                $scope.folderWords.push(folderWordData[key]);
                $scope.folderWords.reverse();
            });
            $scope.folderFlashcardId = $scope.folderWords[0].fid;
            $scope.wordCount = $scope.folderWords.length;
        })
        .catch( (err) => {
            console.log("error fetching folder words", err);
        });
    }


    $scope.deleteFolderWord = (fwid) => {
        WordFactory.deleteFolderWord(fwid)
        .then( (data) => {
            getFolderWords();
        });
    };


});