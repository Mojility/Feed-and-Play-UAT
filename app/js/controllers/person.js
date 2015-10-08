'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($stateParams, peopleService, sessionService, teamService) {

    // ViewModel
    var vm = this;

    vm.currentUserName = peopleService.currentUserName;

   // console.log("personController");

    vm.teamRole = function (teamId, personId) {

        vm.foundRole = '';

        vm.memberships.forEach(function (member) {

            if (member.team_id == teamId && member.person_id == personId) {

                vm.foundRole = member.role;

            }

        });

        return vm.foundRole;
    };

    vm.teamName = function (id) {
        return teamService.getTeam(id).name;

    };

    vm.youtubeLink = function (video) {

        return  teamService.youtubeLink( video);

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

        vm.memberships = sessionService.memberships;

        vm.getTeams(vm.person.id)

    };

    vm.getTeams = function (id) {

        vm.teams = [];

        vm.memberships.forEach(function (member, value) {

            if (member.person_id == id) {
                vm.teams.splice(value, 0, member.team_id);

            }

        });

    };

    vm.getVideos = function (id) {

        return teamService.getVideos(id);

    };

}

controllersModule.controller('PersonController', ['$stateParams', 'PeopleService', 'SessionService', 'TeamService', PersonController]);