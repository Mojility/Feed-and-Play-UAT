'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($http, $stateParams, uiUploader, peopleService, teamService, sessionService) {

    // ViewModel
    var vm = this;

    vm.person="";
    vm.personId="";
    vm.currentUserName="";
    vm.teams="";
    vm.allTeams="";

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
        var customerHeaders =[['X-Auth-Token', sessionService.token]];
        uiUploader.startUpload({
            url: "http://localhost:3000/wherever_you_put_that_new_upload_controller_method",
            concurrency: 2,
            data: { id: vm.personId },
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
            vm.teams           = teamService.getTeamsOfUser(vm.personId);
            vm.allTeams        = teamService.getAllTeams();
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
