'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($stateParams, peopleService, sessionService, teamService) {

    // ViewModel
    var vm = this;

    vm.youtube = "https://www.youtube.com/embed/";

    vm.teamRole = function (teamId, personId) {

        vm.foundRole = '';

        vm.memberships.forEach(function (member, value) {

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

        return vm.youtube + video;

    };

    vm.personIsNotEmpty = function () {

        vm.person = peopleService.getPerson($stateParams.id);

        if (vm.person != null){
            vm.setVariables();
            return true;
        }
        else {
            return false;
        }

    };

    vm.setVariables = function () {

        vm.currentUserName = vm.person.first_name + " " + vm.person.last_name;
        vm.personId = vm.person.id;

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

        vm.team = teamService.getTeam(id);
        vm.videos = vm.team.video_id;
        return vm.videos;

    };

}

controllersModule.controller('PersonController', ['$stateParams', 'PeopleService', 'SessionService','TeamService', PersonController]);