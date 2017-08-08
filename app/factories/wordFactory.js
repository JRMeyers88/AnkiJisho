'use strict';

jpApp.factory('WordFactory', function($q, $http, FirebaseUrl, UserFactory) {

        let getWords = (search) => {
        return $q( (resolve, reject) => {
            $http.get(`https://ankijisho.herokuapp.com/api/jisho/${search}`)
            .then( (words) => {
                resolve(words);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };

        let saveWords = (addedWord) => {
        return $q( (resolve, reject) => {
            $http.post(`${FirebaseUrl}/words.json`,
                angular.toJson(addedWord))
            .then( (savedWordData) => {
                resolve(savedWordData);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };

    let getUserWords = (userId) => {
        return $q( (resolve, reject) => {
            $http.get(`${FirebaseUrl}/words.json?orderBy="uid"&equalTo="${userId}"`)
            .then( (userWords) => {
                resolve(userWords);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };

    let deleteWord = (fbid) => {
        return $q( (resolve, reject) => {
            $http.delete(`${FirebaseUrl}/words/${fbid}.json`)
            .then( (data) => {
                resolve(data);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };


    return { getWords, saveWords, getUserWords, deleteWord };
});