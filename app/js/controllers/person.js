'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($stateParams, peopleService, teamService) {

    // ViewModel
    var vm = this;


    // console.log("personController");

    vm.teamRole = function (teamId) {

        return teamService.getTeamRole(teamId, vm.personId);

    };

    vm.teamName = function (id) {
        return teamService.getTeam(id).name;

    };

    vm.youtubeLink = function (video) {

        return teamService.youtubeLink(video);

    };

    vm.personIsNotEmpty = function () {

        vm.person = peopleService.getPerson($stateParams.id);

        if (vm.person != null) {
            vm.setVariables();
            return true;
        }
        else {
            return false;
        }

    };

    vm.setVariables = function () {

        vm.personId = vm.person.id;
        vm.currentUserName = peopleService.getFullName(vm.personId);
        vm.teams = teamService.getTeams(vm.personId);

    };

    vm.getVideos = function (id) {

        return teamService.getVideos(id);

    };

}

controllersModule.controller('PersonController', ['$stateParams', 'PeopleService', 'TeamService', PersonController]);