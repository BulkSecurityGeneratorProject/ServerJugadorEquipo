(function() {
    'use strict';

    angular
        .module('p4Oauth2App')
        .controller('FavouritePlayerController', FavouritePlayerController);

    FavouritePlayerController.$inject = ['$scope', '$state', 'FavouritePlayer', 'ParseLinks', 'AlertService', 'paginationConstants'];

    function FavouritePlayerController ($scope, $state, FavouritePlayer, ParseLinks, AlertService, paginationConstants) {
        var vm = this;

        vm.favouritePlayers = [];
        vm.loadPage = loadPage;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.page = 0;
        vm.links = {
            last: 0
        };
        vm.predicate = 'id';
        vm.reset = reset;
        vm.reverse = true;

        loadAll();

        function loadAll () {
            FavouritePlayer.query({
                page: vm.page,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }

            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                for (var i = 0; i < data.length; i++) {
                    vm.favouritePlayers.push(data[i]);
                }
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function reset () {
            vm.page = 0;
            vm.favouritePlayers = [];
            loadAll();
        }

        function loadPage(page) {
            vm.page = page;
            loadAll();
        }
    }
})();
