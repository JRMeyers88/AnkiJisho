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
                card.wrong = false;
                $scope.deckArr.push(card);
            });
        });
        console.log("deck array", $scope.deckArr);
    }

    $scope.card = 0;
    $scope.right = function() {
        $scope.card = $scope.card + 1;
    };

    $scope.wrong = function(word) {
        word.wrong = true;
        $scope.deckArr.push(word);
        console.log("deck array wrong", $scope.deckArr);
        $scope.right();
    };

});