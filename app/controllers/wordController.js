'use strict';

jpApp.controller('WordController', function($scope, $q, $http) {

    $scope.$watch('search', function() {
        getWords();
    });

    $scope.search = "hello";


    function getWords() {
        return $q( (resolve, reject) => {
            $http.get("http://jisho.org/api/v1/search/words?keyword=" + $scope.search)
            .then( (words) => {
                $scope.wordArr = [];
                $scope.word = words.data.data;
                angular.forEach($scope.word, function(data) {
                    $scope.wordArr.push(data);
                });
                console.log("words", $scope.wordArr);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    }

});