'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($stateParams, teamService, peopleService) {

    // ViewModel
    var vm = this;

    //console.log("teamController");

    vm.youtubeLink = function (video) {

        return teamService.youtubeLink(video);

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
        vm.teamMembers = teamService.getTeamMembers(vm.teamId);


    };

    vm.getTeamRole = function (PersonId) {

        return teamService.getTeamRole(vm.teamId, PersonId);

    };


    vm.getFirstName = function (id) {

        return peopleService.getFirstName(id);

    };

}

controllersModule.controller('TeamController', ['$stateParams', 'TeamService', 'PeopleService', TeamController]);
