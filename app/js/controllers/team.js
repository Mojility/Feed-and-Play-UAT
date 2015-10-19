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

        return vm.team != null;

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

    vm.addAdvertisedRole = function () {

        teamService.addAdvertisedRole(vm.teamId, vm.newRole);
        vm.newRole = "";

    };

    vm.deleteAdvertisedRole = function (role) {

        teamService.deleteAdvertisedRole(vm.teamId, role);

    };

    vm.getRolesApplied = function (id) {

        return peopleService.getRolesApplied(id);

    };

    vm.rejectApplicant = function (role,id) {

        peopleService.removeTeamMembershipApplications(role,id);

    };

    vm.acceptApplicant = function (role,personId) {

        peopleService.removeTeamMembershipApplications(role,personId);
        teamService.addMember(vm.teamId,personId,role);


    };


    // initialization code can go here, to get executed when the controller is created for a view
    function initialize() {
        vm.team = teamService.getTeam($stateParams.id);
        //console.log("team initialize");

        if (vm.team != null) {
            vm.teamName = vm.team.name;
            vm.teamId = vm.team.team_id;
            vm.videos = teamService.getVideos(vm.teamId);
            vm.teamMembers = teamService.getMembersInTeam(vm.teamId);
            vm.lookingForRoles = teamService.getAdvertisedRoles(vm.teamId);
            vm.getAllPeople = peopleService.getAllPeople;
        }
    }

    initialize();



}

controllersModule.controller('TeamController', ['$stateParams', 'TeamService', 'PeopleService', TeamController]);
