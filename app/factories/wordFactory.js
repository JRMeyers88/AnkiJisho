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

    let deleteUserFolder = (id) => {
        return $q( (resolve, reject) => {
            $http.delete(`${FirebaseUrl}/folders/${id}.json`)
            .then( (data) => {
                resolve(data);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };

    let deleteFolderWord = (fwid) => {
        return $q( (resolve, reject) => {
            $http.delete(`${FirebaseUrl}/addedWords/${fwid}.json`)
            .then( (data) => {
                resolve(data);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };

    let addFolder = (newFolder) => {
        return $q( (resolve, reject) => {
            $http.post(`${FirebaseUrl}/folders.json`,
            angular.toJson(newFolder))
            .then( (newFolderData) => {
                resolve(newFolderData);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };

    let getUserFolders = () => {
        return $q( (resolve, reject) => {
            $http.get(`${FirebaseUrl}/folders.json?orderBy="uid"&equalTo="${UserFactory.getUser()}"`)
            .then( (folderData) => {
                resolve(folderData);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };

    let getFolderWords = (folderId) => {
        return $q( (resolve, reject) => {
            $http.get(`${FirebaseUrl}/addedWords.json?orderBy="fid"&equalTo="${folderId}"`)
            .then( (folderWords) => {
                resolve(folderWords);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };

    let addWord = (addedWord) => {
        return $q( (resolve, reject) => {
            $http.post(`${FirebaseUrl}/addedWords.json`, angular.toJson(addedWord))
            .then( (wordData) => {
                resolve(wordData);
            })
            .catch( (err) => {
                reject(err);
            });
        });
    };


    return { getWords, saveWords, getUserWords, deleteWord, addFolder, getUserFolders, addWord, getFolderWords, deleteFolderWord, deleteUserFolder };
});