'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($stateParams, teamService, peopleService, sessionService) {

    // ViewModel
    var vm = this;

    vm.youtube = "https://www.youtube.com/embed/";

    vm.youtubeLink = function (video) {

        return vm.youtube + video;

    };

    vm.teamIsNotEmpty = function () {

        vm.team = teamService.getTeam($stateParams.id);

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
        vm.memberships = sessionService.memberships;


        vm.teamId = vm.team.team_id;

        vm.videos = vm.team.video_id;
        vm.getTeamMembers(vm.team.team_id);

    };

    vm.getTeamMembers = function (id) {

        vm.teamMembers = [];

        vm.memberships.forEach(function (member, value) {


            if (member.team_id == id) {
                vm.teamMembers.splice(value, 0, member.person_id);
            }


        });


    };


    vm.userName = function (id) {

        return peopleService.getPerson(id).first_name;

    };

}

controllersModule.controller('TeamController', ['$stateParams', 'TeamService', 'PeopleService', 'SessionService', TeamController]);
