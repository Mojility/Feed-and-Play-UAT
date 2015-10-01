'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'ExampleCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  })
.state('Team', {
    url: '/team',
    controller: 'TeamController as team',
    templateUrl: 'team.html',
    title: 'Team'
  });


  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;