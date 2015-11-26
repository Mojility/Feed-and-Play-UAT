'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($scope, $stateParams, teamService, peopleService, sessionService) {

    // ViewModel
    var vm = this;
    vm.newRole = "";
    vm.editRole = "";

    vm.team ="";
    vm.teamName = "";
    vm.teamId = "";
    vm.videos = "";
    vm.teamMembers = "";
    vm.lookingForRoles = "";
    vm.getAllPeople = "";
    vm.openings = "";
    vm.applications = "";
    vm.title = "";
    vm.description = "";
    vm.dueDate = "";
    vm.rules = "";

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

    vm.getLastName = function (id) {

        return peopleService.getLastName(id);

    };

    vm.getAvatar = function (id) {

        return peopleService.getAvatar(id);

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
        vm.lookingForRoles = teamService.getAdvertisedRoles(vm.teamId);

    };

    vm.updateAdvertisedRole = function (role) {

        //console.log(role);
        teamService.updateAdvertisedRole(vm.teamId, role, vm.editRole);
        vm.editRole = "";

    };

    vm.deleteAdvertisedRole = function (role) {

        teamService.deleteAdvertisedRole(vm.teamId, role);
        vm.lookingForRoles = teamService.getAdvertisedRoles(vm.teamId);

    };

    vm.getRolesApplied = function (id) {
        //    console.log(peopleService.getRolesApplied(id));
        return peopleService.getRolesApplied(id);

    };

    vm.getOpening = function (id) {

        return teamService.getOpening(id);

    };

    vm.rejectApplicant = function (application, id) {

       // console.log(application);
        peopleService.removeTeamMembershipApplications(application, id);


    };

    vm.acceptApplicant = function (application, personId) {

        var opening = vm.getOpening(application.opening_id);
        peopleService.removeTeamMembershipApplications(application, personId);
        teamService.addMember(vm.teamId, personId, opening.role);
        vm.teamMembers = teamService.getMembersInTeam(vm.teamId);

    };


    vm.isPartOfTeam = function() {

      // console.log(vm.teamMembers);
      var found;
     vm.teamMembers.forEach (function (member) {
      //console.log(member);
      //  console.log(member);

       if (sessionService.person.id === member ){

         found =  true;
       }
       else {
        // console.log("wrong user");
       }

     });

      return found;

    };

    vm.thumbsUp = function(video) {

        var value = 1;
        teamService.updateVotes(video, value, function() {
          $scope.$apply();
        });
      //  console.log("test");

    };

    vm.thumbsDown = function(video) {

        var value = -1;
        teamService.updateVotes(video, value,function() {
          $scope.$apply();
        });

    };

    vm.getScore = function(video) {

      return teamService.getScore(video);

    };

    vm.getNumberOfVotes = function(video) {

      return teamService.getNumberOfVotes(video);

    };

    vm.isLeader = function(teamId,personId) {

      return teamService.isLeader(teamId,personId);

    };

    vm.addContest = function() {

    teamService.addContest(vm.title,vm.description, vm.duedate, vm.rules);

    };

    // initialization code can go here, to get executed when the controller is created for a view
    function initialize() {
        vm.team = teamService.getTeam($stateParams.id);

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

controllersModule.controller('TeamController', ['$scope', '$stateParams', 'TeamService', 'PeopleService', 'SessionService', TeamController]);
