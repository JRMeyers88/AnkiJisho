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
                  return 0.5 - Math.random();
                });
            });
        });
    }


    $scope.card = 0;
    $scope.right = function() {
        $scope.card = $scope.card + 1;
    };


    $scope.wrong = function(word) {
        $scope.deckArr.push(word);
        $scope.right();
    };

});