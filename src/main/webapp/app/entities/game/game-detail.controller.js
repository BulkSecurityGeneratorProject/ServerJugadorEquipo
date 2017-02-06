(function() {
    'use strict';

    angular
        .module('p4Oauth2App')
        .controller('GameDetailController', GameDetailController);

    GameDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Game', 'Team', 'GameRating'];

    function GameDetailController($scope, $rootScope, $stateParams, previousState, entity, Game, Team, GameRating) {
        var vm = this;

        vm.game = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('p4Oauth2App:gameUpdate', function(event, result) {
            vm.game = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
