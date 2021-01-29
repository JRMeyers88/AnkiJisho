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

    $scope.openModal = () => {
        modal.open();
    };
    // instanciate new modal
    var modal = new tingle.modal({
        footer: true,
        scope: $scope,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('modal open');
        },
        onClose: function() {
            console.log('modal closed');
        },
        beforeClose: function() {
            // here's goes some logic
            // e.g. save content before closing the modal
            return true; // close the modal
        }
    });

    // set content
    modal.setContent('<a href="#" class="waves-effect waves-light btn">button</a>');

    // add a button
    modal.addFooterBtn('Cancel', 'aves-effect waves-light btn', function() {
        // here goes some logic
        modal.close();
    });


});