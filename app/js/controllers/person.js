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
        return vm.person != null;
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

    vm.getAdvertisedRoles = function (id) {

        //console.log("getAdvertisedRoles");
        return teamService.getAdvertisedRoles(id);
    };

    vm.addTeamMembershipApplication = function (role, teamId) {

        peopleService.addTeamMembershipApplication(role, teamId, vm.personId);
        teamService.deleteAdvertisedRole(teamId,role);
    };



    // initialization code can go here, to get executed when the controller is created for a view
    function initialize() {
        vm.person = peopleService.getPerson($stateParams.id);
       // console.log("person initialize");

        if (vm.person != null) {
            vm.personId = vm.person.id;
            vm.currentUserName = peopleService.getFullName(vm.personId);
            vm.teams = teamService.getTeamsOfUser(vm.personId);
            vm.allTeams = teamService.getAllTeams;
            vm.rolesApplied = peopleService.getRolesApplied(vm.personId);
        }
    }

    initialize();

}

controllersModule.controller('PersonController', ['$stateParams', 'PeopleService', 'TeamService', PersonController]);
