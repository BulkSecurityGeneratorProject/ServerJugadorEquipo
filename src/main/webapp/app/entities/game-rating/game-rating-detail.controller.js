(function() {
    'use strict';

    angular
        .module('p4Oauth2App')
        .controller('GameRatingDetailController', GameRatingDetailController);

    GameRatingDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'GameRating', 'User', 'Game'];

    function GameRatingDetailController($scope, $rootScope, $stateParams, previousState, entity, GameRating, User, Game) {
        var vm = this;

        vm.gameRating = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('p4Oauth2App:gameRatingUpdate', function(event, result) {
            vm.gameRating = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
