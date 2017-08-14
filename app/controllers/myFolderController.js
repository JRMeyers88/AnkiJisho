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
                // console.log("fwid", folderWordData.fwid);
                $scope.folderWords.push(folderWordData[key]);
            });
            console.log("folderwords", $scope.folderWords);
            $scope.folderFlashcardId = $scope.folderWords[0].fid;
        })
        .catch( (err) => {
            console.log("error fetching folder words", err);
        });
    }


    $scope.deleteFolderWord = (fwid) => {
        console.log("fbid", fwid);
        WordFactory.deleteFolderWord(fwid)
        .then( (data) => {
            getFolderWords();
        });
    };


});