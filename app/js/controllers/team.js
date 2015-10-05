'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($stateParams, sessionService, teamService, peopleService, $sce) {

    // ViewModel
    var vm = this;


    vm.teamIsNotEmpty = function () {

        vm.team = teamService.getTeam($stateParams.id);

        if (vm.team != null) {

            vm.setVariables();
            return true;
        }
        else {

            return false;
        }

    };

    vm.setVariables = function () {


        vm.teamName = vm.team.name;
        vm.teamMembers = vm.team.member_ids;
        vm.video = vm.team.video_id;

        $sce.trustAsResourceUrl(vm.video);

    };


    vm.userName = function (id) {

        return peopleService.getPerson(id).first_name;

    };

}

controllersModule.controller('TeamController', ['$stateParams', 'SessionService', 'TeamService', 'PeopleService', "$sce", TeamController]);
