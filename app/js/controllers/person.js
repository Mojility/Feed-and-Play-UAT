'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($http, $stateParams, peopleService, teamService) {

    // ViewModel
    var vm = this;



    // console.log("personController");

    vm.personIsNotEmpty = function () {
        return vm.person !== null;
    };

    vm.getTeamRole = function (teamId) {

        return teamService.getTeamRole(teamId, vm.personId);

    };

    vm.getTeamName = function (id) {

        return teamService.getTeam(id).name;

    };

    vm.getVideos = function (id) {

        //console.log(teamService.getVideos(id));

        return teamService.getVideos(id);

    };

    vm.getYoutubeLink = function (video) {

      // console.log("hello");

        return teamService.getYoutubeLink(video);

    };

    //vm.updateAdvertisedRoles = function () {
    //
    //    console.log("updateAdvertisedRoles");
    //
    //    //$http({
    //    //    method: 'GET',
    //    //    url: 'http://localhost:3000/'
    //    //}).then(function successCallback(response) {
    //    //
    //    //    //console.log(response.data.teams);
    //    //
    //    //    teamService.loadCache(response.data.teams);
    //    //
    //    //
    //    //}, function errorCallback(response) {
    //    //   // console.log(response);
    //    //    // console.log("fail"  );
    //    //    // called asynchronously if an error occurs
    //    //    // or server returns response with an error status.
    //    //});
    //
    //};


    vm.getAdvertisedRoles = function (id) {

      //  console.log(teamService.getAdvertisedRoles(id))
        return teamService.getAdvertisedRoles(id);

    };

    vm.addTeamMembershipApplication = function (role, teamId) {

        //console.log(role.role);

        peopleService.addTeamMembershipApplication(role, teamId, vm.personId);
        //teamService.deleteAdvertisedRole(teamId, role);
    };


    // initialization code can go here, to get executed when the controller is created for a view
    function initialize() {
        vm.person = peopleService.getPerson($stateParams.id);
        console.log(vm.person);
       // peopleService.setCurrentUserId(vm.person.id);

        if (vm.person !== undefined) {
           // vm.updateAdvertisedRoles();
            vm.personId = vm.person.id;
            vm.currentUserName = peopleService.getFullName(vm.personId);
            vm.teams = teamService.getTeamsOfUser(vm.personId);
            vm.allTeams = teamService.getAllTeams();
            //console.log(vm.allTeams);
           // vm.rolesApplied = peopleService.getRolesApplied(vm.personId);

        }
    }

    initialize();

}

controllersModule.controller('PersonController', ['$http', '$stateParams', 'PeopleService', 'TeamService', PersonController]);
