'use strict';

jpApp.controller('WordController', function($scope, $q, $window, WordFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated(currentUser)
    .then( (user) => {
    currentUser = UserFactory.getUser();
    });

    $scope.$watch('search', function() {
        getWords();
    });

    $scope.isLoggedIn = false;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.isLoggedIn = true;
            $scope.$apply();
        } else {
            $scope.isLoggedIn = false;
            $scope.$apply();
            $window.location.href = "#!/login";
        }
    });

    $scope.search = "";


    function getWords() {
        WordFactory.getWords($scope.search)
            .then( (words) => {
                $scope.wordArr = [];
                $scope.word = words.data.data;
                angular.forEach($scope.word, function(data) {
                    $scope.wordArr.push(data);
                });
                console.log("words", $scope.wordArr);
            })
            .catch( (err) => {
                console.log("error", err);
            });
        }

    $scope.saveWord = (word) => {
        word.uid = currentUser;
        let addedWord = word;
        WordFactory.saveWords(word);
        console.log("you saved the word", word);
    };

});