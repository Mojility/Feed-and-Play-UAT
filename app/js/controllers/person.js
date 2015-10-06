'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($stateParams, peopleService, sessionService, teamService) {

    // ViewModel
    var vm = this;


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

        vm.memberships = sessionService.memberships;

        vm.getTeams(vm.person.id)
       // console.log(vm.teams);
      //  vm.getVideos( vm.getTeams(vm.person.id));
    };


    vm.getTeams = function (id) {

        vm.teams = [];

        vm.memberships.forEach(function (member, value) {

            if (member.person_id == id) {
                vm.teams.splice(value, 0, member.team_id);
                //console.log("true");

            }


        });





    };

    vm.getVideos = function (id) {

        vm.team = teamService.getTeam(id);
        console.log(vm.team);
        vm.videos = vm.team.video_id;
        console.log(vm.videos);
        return vm.videos;

    };

}

controllersModule.controller('PersonController', ['$stateParams', 'PeopleService', 'SessionService','TeamService', PersonController]);