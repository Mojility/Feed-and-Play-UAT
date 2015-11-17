'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('Home', {
            url: '/',
            controller: 'HomeController as home',
            templateUrl: 'home.html',
            title: 'Home'
        })
        .state('Team', {
            url: '/team/:id',
            controller: 'TeamController as team',
            templateUrl: 'team.html',
            title: 'Team'
        })
        .state('Person', {
            url: '/person/:id',
            controller: 'PersonController as person',
            templateUrl: 'person.html',
            title: 'Person'
        })
        .state('Login', {
            url: '/login',
            controller: 'LoginController as login',
            templateUrl: 'login.html',
            title: 'Login'
        })
        .state('profile_edit', {
            url: '/profile_edit/:id',
            controller: 'PersonController as person',
            templateUrl: 'profile_edit.html',
            title: 'Profile Edit'
        })
        .state('open_positions', {
            url: '/open_positions',
            controller: 'OpenController as open',
            templateUrl: 'open_positions.html',
            title: 'open positions'
        })
        .state('team_management', {
            url: '/team_management/:id',
            controller: 'TeamController as team',
            templateUrl: 'team_management.html',
            title: 'team management'
        })
        .state('video', {
            url: '/video/:id',
            controller: 'VideoController as video',
            templateUrl: 'video.html',
            title: 'video view'
        });


    $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;
