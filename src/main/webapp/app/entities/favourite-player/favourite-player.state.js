(function() {
    'use strict';

    angular
        .module('p4Oauth2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('favourite-player', {
            parent: 'entity',
            url: '/favourite-player',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'FavouritePlayers'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/favourite-player/favourite-players.html',
                    controller: 'FavouritePlayerController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('favourite-player-detail', {
            parent: 'favourite-player',
            url: '/favourite-player/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'FavouritePlayer'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/favourite-player/favourite-player-detail.html',
                    controller: 'FavouritePlayerDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'FavouritePlayer', function($stateParams, FavouritePlayer) {
                    return FavouritePlayer.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'favourite-player',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('favourite-player-detail.edit', {
            parent: 'favourite-player-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-player/favourite-player-dialog.html',
                    controller: 'FavouritePlayerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FavouritePlayer', function(FavouritePlayer) {
                            return FavouritePlayer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('favourite-player.new', {
            parent: 'favourite-player',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-player/favourite-player-dialog.html',
                    controller: 'FavouritePlayerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                favouriteDateTime: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('favourite-player', null, { reload: 'favourite-player' });
                }, function() {
                    $state.go('favourite-player');
                });
            }]
        })
        .state('favourite-player.edit', {
            parent: 'favourite-player',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-player/favourite-player-dialog.html',
                    controller: 'FavouritePlayerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FavouritePlayer', function(FavouritePlayer) {
                            return FavouritePlayer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('favourite-player', null, { reload: 'favourite-player' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('favourite-player.delete', {
            parent: 'favourite-player',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/favourite-player/favourite-player-delete-dialog.html',
                    controller: 'FavouritePlayerDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FavouritePlayer', function(FavouritePlayer) {
                            return FavouritePlayer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('favourite-player', null, { reload: 'favourite-player' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
