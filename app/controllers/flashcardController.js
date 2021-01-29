'use strict';

jpApp.controller("FlashcardController", function($scope, $window, UserFactory, WordFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated()
    .then( (user) => {
        if(user){
            currentUser = UserFactory.getUser();
            createDeck();
        }
    });

    function createDeck() {
        $scope.deckArr = [];
        WordFactory.getUserWords(currentUser)
        .then( (cardData) => {
            let cardList = cardData.data;
            angular.forEach(cardList, function(card) {
                $scope.deckArr.push(card);
                $scope.deckArr.sort(function() {
                  // return 0.5 - Math.random();
                  return Math.floor(Math.random() * $scope.deckArr.length);
                });
                $scope.remainingWords = $scope.deckArr.length;
            });
        });
    }


    $scope.card = 0;
    $scope.totalRight = 0;
    $scope.totalWrong = 0;
    $scope.right = function() {
        $scope.card = $scope.card + 1;
        $scope.remainingWords--;
        $scope.totalRight++;
    };


    $scope.wrong = function(word) {
        $scope.deckArr.push(word);
        $scope.remainingWords++;
        $scope.totalWrong++;
        $scope.totalRight--;
        $scope.right();
    };

});