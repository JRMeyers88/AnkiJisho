'use strict';

jpApp.controller("SavedController", function($scope, $window, $routeParams, WordFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated()
    .then( (user) => {
        if(user){
            currentUser = UserFactory.getUser();
            getUserWords();
        }
    });

    function getUserWords() {
        $scope.userWordArr = [];
        WordFactory.getUserWords(currentUser)
        .then( (wordList) => {
            let userWordData = wordList.data;
            Object.keys(userWordData).forEach( (key) => {
                userWordData[key].fbid = key;
                $scope.userWordArr.push(userWordData[key]);
            });
            console.log("User Words", $scope.userWordArr);
        });
    }

    $scope.deleteUserWord = (fbid) => {
        console.log("fbid", fbid);
        WordFactory.deleteWord(fbid)
        .then( (data) => {
            getUserWords();
        });
    };


});