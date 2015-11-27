'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($scope, $http, $stateParams, uiUploader, peopleService, teamService, cacheService, sessionService) {

    // ViewModel
    var vm = this;
    vm.newFirstName = "";
    vm.newLastName = "";
    vm.newEmail = "";
    vm.newPassword = "";

    vm.validUser = false;

    vm.person="";
    vm.personId="";
    vm.currentUserName="";
    vm.teams="";
    vm.allTeams="";
    vm.avatar = '';
    vm.stageName = '';

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

    vm.updatePerson = function() {

      peopleService.updatePerson(vm.personId, vm.password,vm.firstName, vm.lastName, vm.email, vm.stageName);

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


        // peopleService.setCurrentUserId(vm.person.id);

        if (vm.person !== undefined) {

            // vm.updateAdvertisedRoles();
            // console.log(vm.person.id);
            // console.log(sessionService.person.id);
            if (sessionService.person.id === vm.person.id) {
                 vm.validUser = true;
                //  console.log("valid");
            }
              vm.personId = vm.person.id;

              vm.currentUserName = peopleService.getFullName(vm.personId);
              vm.stageName = vm.person.stage_name;

              vm.firstName = vm.person.first_name;
              vm.lastName = vm.person.last_name;

              vm.password = vm.person.password;
              vm.email = vm.person.email;

              vm.teams = teamService.getTeamsOfUser(vm.personId);
              vm.allTeams = teamService.getAllTeams();
              vm.avatar = vm.person.avatar.avatar.url;


            // }  else {
            //
            // console.log("wrong user");
            // }
        //      console.log(vm.avatar);


        }

    }

    function initializeUploadFileField() {
        var el = document.getElementById("file");
        if (el !== null) {
          el.addEventListener("change", function(event) {
              var files = event.target.files;
              uiUploader.addFiles(files);
          });
        }
    }

    function setupWithCacheData() {
        initializeCurrentPerson();
        initializeUploadFileField();
    }

    function initialize() {
        if (!cacheService.hasPrimed) {
            cacheService.requestData(function() {
                setupWithCacheData();
                $scope.$apply();
            });
        } else {
            setupWithCacheData();
        }
    }

    initialize();

}

controllersModule.controller('PersonController', ['$scope', '$http', '$stateParams', 'uiUploader', 'PeopleService', 'TeamService', 'CacheService', 'SessionService', PersonController]);
