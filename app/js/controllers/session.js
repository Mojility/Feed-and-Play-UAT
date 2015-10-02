'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function SessionController($scope, $timeout, $http, sessionService, peopleService, teamService) {

    // ViewModel
    var vm = this;

    vm.currentUserName = sessionService.currentUserName;
    vm.getAllPeople = peopleService.getAllPeople;
    vm.getAllTeams =  teamService.getAllTeams;


    $http({
              method: 'GET',
              url: 'data/profile.json'
          }).then(function successCallback(response) {

        sessionService.initialize(response.data);

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

}

controllersModule.controller('SessionController',['$scope', '$timeout', '$http', 'SessionService', 'PeopleService','TeamService', SessionController]);
