'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($stateParams, peopleService, teamService) {

    // ViewModel
    var vm = this;

    // console.log("personController");

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
        vm.teams = teamService.getTeamsOfUser(vm.personId);
        vm.allTeams = teamService.getAllTeams;
        vm.rolesApplied = vm.person.role_applied;


    };

    vm.getTeamRole = function (teamId) {

        return teamService.getTeamRole(teamId, vm.personId);

    };

    vm.getTeamName = function (id) {

        return teamService.getTeam(id).name;

    };

    vm.getVideos = function (id) {

        return teamService.getVideos(id);

    };

    vm.getYoutubeLink = function (video) {

        return teamService.getYoutubeLink(video);

    };

    vm.getLookingForRoles = function (id) {

        return teamService.getLookingForRoles(id);
    };

    vm.addLookingForRoles = function (role, id) {

        vm.rolesApplied.push({
            "team_id": id,
            "role": role
        });
    }

}

controllersModule.controller('PersonController', ['$stateParams', 'PeopleService', 'TeamService', PersonController]);