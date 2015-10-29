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
            title: 'Person'
        });


    $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;