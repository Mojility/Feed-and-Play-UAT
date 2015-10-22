'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function SessionController($http, sessionService, peopleService, teamService) {

    // ViewModel
    var vm = this;

    vm.currentUserName = peopleService.getCurrentUserName;
    vm.allPeople = peopleService.getAllPeople;
    vm.allTeams = teamService.getAllTeams;

    //console.log("session");
    $http({
        method: 'GET',
        url: 'http://localhost:3000/'
    }).then(function successCallback(response) {

        // console.log(response);
        sessionService.initialize(response.data);

    }, function errorCallback(response) {

        console.log(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

}

controllersModule.controller('SessionController', ['$http', 'SessionService', 'PeopleService', 'TeamService', SessionController]);
