'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($http, $stateParams, uiUploader, peopleService, teamService, sessionService) {

    // ViewModel
    var vm = this;
    vm.newFirstName = "";
    vm.newLastName = "";
    vm.newEmail = "";
    vm.newPassword = "";

    vm.person="";
    vm.personId="";
    vm.currentUserName="";
    vm.teams="";
    vm.allTeams="";

    // console.log("personController");  vm.allTeams = teamService.getAllTeams();
    vm.personIsNotEmpty = function () {
        return vm.person !== null;
    };

    vm.firstNameEnabled = function () {

        if (vm.newFirstName !== "") {
            return true;
        }
    };

    vm.lastNameEnabled = function () {

        if (vm.newLastName !== "") {
            return true;
        }
    };

    vm.emailEnabled = function () {

        if (vm.newEmail !== "") {
            return true;
        }
    };

    vm.passwordEnabled = function () {

        if (vm.newPassword !== "") {
            return true;
        }
    };

    vm.updateFirstName = function() {

      peopleService.updateFirstName(vm.personId, vm.newFirstName);
      vm.newFirstName = "";

    };

    vm.updateLastName = function() {

      peopleService.updateLastName(vm.personId, vm.newLastName);
      vm.newLastName = "";

    };

    vm.updateEmail = function() {

      peopleService.updateEmail(vm.personId, vm.newEmail);
      vm.newEmail = "";

    };

    vm.updatePassword = function() {

      peopleService.updatePassword(vm.personId, vm.newPassword);
      vm.newPassword = "";

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

    vm.getAdvertisedRoles = function (id) {

      //  console.log(teamService.getAdvertisedRoles(id))
        return teamService.getAdvertisedRoles(id);

    };

    vm.addTeamMembershipApplication = function (role, teamId) {

        //console.log(role.role);

        peopleService.addTeamMembershipApplication(role, teamId, vm.personId);
        //teamService.deleteAdvertisedRole(teamId, role);
    };

    vm.userClickedUploadButton = function() {
        // console.log("userClickedUploadButton")
        console.log(vm.personId);
        var customerHeaders =[['X-Auth-Token', sessionService.token]];
        uiUploader.startUpload({
            url: "http://localhost:3000/upload/" + vm.personId,
            concurrency: 2,
            // data: { id: vm.personId },
            customHeaders: customerHeaders,
            onProgress: function(file) {
                console.log(file);
            },
            onCompleted: function(file, response) {
                console.log("Completed: " + file.name);
            },
            onCompletedAll: function(files) {
                console.log("All files completed.");
            }
        });

    };


    // initialization code can go here, to get executed when the controller is created for a view
    function initializeCurrentPerson() {

        vm.person = peopleService.getPerson($stateParams.id);
        //console.log(vm.person);
        // peopleService.setCurrentUserId(vm.person.id);

        if (vm.person !== undefined) {
            // vm.updateAdvertisedRoles();
            vm.personId        = vm.person.id;

            vm.currentUserName = peopleService.getFullName(vm.personId);


            vm.teams = teamService.getTeamsOfUser(vm.personId);
            vm.allTeams = teamService.getAllTeams();
            vm.avatar = vm.person.avatar.avatar.url;
        //      console.log(vm.avatar);


        }

    }

    function initializeUploadFileField() {
        var el = document.getElementById("file");
        el.addEventListener("change", function(event) {
            var files = event.target.files;
            uiUploader.addFiles(files);
        });
    }

    function initialize() {
        initializeCurrentPerson();
        initializeUploadFileField();
    }

    initialize();

}

controllersModule.controller('PersonController', ['$http', '$stateParams', 'uiUploader', 'PeopleService', 'TeamService', 'SessionService', PersonController]);
