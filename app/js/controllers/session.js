'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function SessionController($http, sessionService, peopleService, teamService) {

    // ViewModel
    var vm = this;

    vm.currentUserName = peopleService.currentUserName;
    vm.getAllPeople = peopleService.getAllPeople;
    vm.getAllTeams = teamService.getAllTeams;

    //console.log("session");
    $http({
        method: 'GET',
        url: 'data/profile.json'
    }).then(function successCallback(response) {

        // console.log("success");
        sessionService.initialize(response.data);

    }, function errorCallback(response) {

        // console.log("fail"  );
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

}

controllersModule.controller('SessionController', ['$http', 'SessionService', 'PeopleService', 'TeamService', SessionController]);
