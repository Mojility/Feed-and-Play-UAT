'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function SessionController(sessionService, peopleService, teamService) {

    // ViewModel
    var vm = this;

    //vm.currentUserName = peopleService.getCurrentUserName;
    //vm.allPeople = peopleService.getAllPeople;
    //vm.allTeams = teamService.getAllTeams;

}

controllersModule.controller('SessionController', ['SessionService', 'PeopleService', 'TeamService', SessionController]);
