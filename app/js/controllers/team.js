'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($stateParams, teamService, peopleService) {

    // ViewModel
    var vm = this;
    vm.newRole = "";

    //console.log("teamController");

    vm.getYoutubeLink = function (video) {

        return teamService.getYoutubeLink(video);

    };

    vm.teamIsNotEmpty = function () {

        vm.team = teamService.getTeam($stateParams.id);
        // console.log(vm.team);

        if (vm.team != null) {

            vm.setVariables();
            return true;
        }
        else {

            return false;
        }

    };

    vm.setVariables = function () {

        vm.teamName = vm.team.name;
        vm.teamId = vm.team.team_id;
        vm.videos = teamService.getVideos(vm.teamId);
        vm.teamMembers = teamService.getMembersInTeam(vm.teamId);
        vm.lookingForRoles = teamService.getLookingForRoles(vm.teamId);

    };

    vm.getTeamRole = function (PersonId) {

        return teamService.getTeamRole(vm.teamId, PersonId);

    };

    vm.getFirstName = function (id) {

        return peopleService.getFirstName(id);

    };

    vm.addEnabled = function () {

        if (vm.newRole != "") {
            return true;
        }
    };

    vm.addLookingForRole = function () {

        teamService.addLookingForRole(vm.teamId, vm.newRole);
        vm.newRole = "";

    };

    vm.deleteLookingForRole = function (role) {

        teamService.deleteLookingForRole(vm.teamId, role);

    };


}

controllersModule.controller('TeamController', ['$stateParams', 'TeamService', 'PeopleService', TeamController]);
