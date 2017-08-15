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

    function timeSort(a, b) {
        let sortedArr = [];
        sortedArr.push(a.timestamp - b.timestamp);
        return sortedArr;
    }

    function getUserWords() {
        $scope.userWordArr = [];
        WordFactory.getUserWords(currentUser)
        .then( (wordList) => {
            let userWordData = wordList.data;
            Object.keys(userWordData).forEach( (key) => {
                userWordData[key].fbid = key;
                $scope.userWordArr.push(userWordData[key]);
                $scope.userWordArr.sort(timeSort).reverse();
                $scope.wordCount = $scope.userWordArr.length;
            });
        });
    }


    $scope.deleteUserWord = (fbid) => {
        WordFactory.deleteWord(fbid)
        .then( (data) => {
            getUserWords();
        });
    };


});