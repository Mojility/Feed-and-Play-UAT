'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function OpenController(teamService,peopleService) {
 var vm = this;

   vm.getAdvertisedRoles = function (id) {

      //  console.log("getAdvertisedRole")
       return teamService.getAdvertisedRoles(id);

   };

   vm.addTeamMembershipApplication = function (role, teamId) {

       console.log("test");

       peopleService.addTeamMembershipApplication(role, teamId);
       //teamService.deleteAdvertisedRole(teamId, role);
   };

   function initialize() {


         vm.allTeams = teamService.getAllTeams();
        //  vm.lookingForRoles = teamService.getAdvertisedRoles(vm.teamId);
    }
    initialize();
}

controllersModule.controller('OpenController', ['TeamService','PeopleService', OpenController ]);
