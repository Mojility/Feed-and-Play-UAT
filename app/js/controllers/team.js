'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($stateParams, teamService, peopleService) {

    // ViewModel
    var vm = this;

    vm.youtube="https://www.youtube.com/embed/";

    vm.youtubeLink = function (video) {

        return vm.youtube + video;

    };

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
        vm.videos = vm.team.video_id;




    };


    vm.userName = function (id) {

        return peopleService.getPerson(id).first_name;

    };

}

controllersModule.controller('TeamController', ['$stateParams', 'TeamService', 'PeopleService', TeamController]);
