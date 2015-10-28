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

        return vm.team !== null;

    };

    vm.getTeamRole = function (PersonId) {

        return teamService.getTeamRole(vm.teamId, PersonId);

    };

    vm.getFirstName = function (id) {

        return peopleService.getFirstName(id);

    };

    vm.addEnabled = function () {

        if (vm.newRole !== "") {
            return true;
        }
    };

    vm.editEnabled = function () {

        if (vm.editRole !== "") {
            return true;
        }
    };

    vm.addAdvertisedRole = function () {

        // console.log(vm.newRole);
        teamService.addAdvertisedRole(vm.teamId, vm.newRole);
        vm.newRole = "";

    };

    vm.editAdvertisedRole = function (role) {

        //console.log(role);
        teamService.editAdvertisedRole(vm.teamId, role, vm.editRole);
        vm.editRole = "";

    };

    vm.deleteAdvertisedRole = function (role) {

        teamService.deleteAdvertisedRole(vm.teamId, role);

    };

    vm.getRolesApplied = function (id) {
        //    console.log(peopleService.getRolesApplied(id));
        return peopleService.getRolesApplied(id);

    };

    vm.getOpening = function (id) {

        return teamService.getOpening(id);

    };

    vm.rejectApplicant = function (role, id) {

        peopleService.removeTeamMembershipApplications(role, id);

    };

    vm.acceptApplicant = function (application, personId) {

        var opening = vm.getOpening(application.opening_id);
        peopleService.removeTeamMembershipApplications(application, personId);
        teamService.addMember(vm.teamId, personId, opening.role);
        vm.teamMembers = teamService.getMembersInTeam(vm.teamId);

    };

    // initialization code can go here, to get executed when the controller is created for a view
    function initialize() {
        vm.team = teamService.getTeam($stateParams.id);
        // console.log(vm.team);

        if (vm.team !== undefined) {
            vm.teamName = vm.team.name;
            vm.teamId = vm.team.id;
            // console.log(vm.teamId);
            vm.videos = teamService.getVideos(vm.teamId);
            // console.log(vm.videos);
            vm.teamMembers = teamService.getMembersInTeam(vm.teamId);
            vm.lookingForRoles = teamService.getAdvertisedRoles(vm.teamId);
            //console.log(teamService.getAdvertisedRoles(vm.teamId));
            vm.getAllPeople = peopleService.getAllPeople;
            vm.openings = teamService.openings;
            vm.applications = peopleService.applications;
        }
    }

    initialize();

}

controllersModule.controller('TeamController', ['$stateParams', 'TeamService', 'PeopleService', TeamController]);
