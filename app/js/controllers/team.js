'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($stateParams, sessionService, teamService, peopleService) {

    // ViewModel
    var vm = this;


    //console.log(teamService.cache);
    console.log(teamService.getTeam($stateParams.id));
    console.log($stateParams.id);
    //vm.teamName = TeamService.getTeam($stateParams.id);

}

controllersModule.controller('TeamController',['$stateParams', 'SessionService', 'TeamService', 'PeopleService',  TeamController]);
