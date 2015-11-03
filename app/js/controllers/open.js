'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function OpenController(teamService) {
 var vm = this;

   vm.getAdvertisedRoles = function (id) {

      //  console.log("getAdvertisedRole")
       return teamService.getAdvertisedRoles(id);

   };

   function initialize() {


         vm.allTeams = teamService.getAllTeams();
        //  vm.lookingForRoles = teamService.getAdvertisedRoles(vm.teamId);
    }
    initialize();
}

controllersModule.controller('OpenController', ['TeamService', OpenController ]);
