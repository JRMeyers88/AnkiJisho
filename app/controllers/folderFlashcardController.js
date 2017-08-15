'use strict';

jpApp.controller("FolderFlashcardController", function($scope, $window, $routeParams, UserFactory, WordFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated()
    .then( (user) => {
        if(user){
            currentUser = UserFactory.getUser();
            createFolderDeck();
        }
    });

    function createFolderDeck() {
        $scope.folderDeckArr = [];
        WordFactory.getFolderWords($routeParams.folderId)
        .then( (cardData) => {
            let cardList = cardData.data;
            angular.forEach(cardList, function(card) {
                $scope.folderDeckArr.push(card);
                $scope.folderDeckArr.sort(function() {
                  return Math.floor(Math.random() * $scope.folderDeckArr.length);
                });
                $scope.remainingWords = $scope.folderDeckArr.length;
            });
        });
    }


    $scope.card = 0;
    $scope.right = function() {
        $scope.card = $scope.card + 1;
        $scope.remainingWords--;
    };


    $scope.wrong = function(word) {
        $scope.folderDeckArr.push(word);
        $scope.remainingWords++;
        $scope.right();
    };

});