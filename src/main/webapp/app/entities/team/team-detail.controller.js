(function() {
    'use strict';

    angular
        .module('p4Oauth2App')
        .controller('TeamDetailController', TeamDetailController);

    TeamDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Team', 'Game', 'Player'];

    function TeamDetailController($scope, $rootScope, $stateParams, previousState, entity, Team, Game, Player) {
        var vm = this;

        vm.team = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('p4Oauth2App:teamUpdate', function(event, result) {
            vm.team = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
