'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($stateParams, sessionService, teamService, peopleService) {

    // ViewModel
    var vm = this;


    //console.log(teamService.cache);
    //console.log(teamService.getTeam($stateParams.id));
    vm.team = teamService.getTeam($stateParams.id);
    vm.teamName = vm.team.name;
    vm.teamMembers = vm.team.member_ids;
    vm.video = vm.team.video_id;
    console.log(vm.video);
    //console.log(vm.teamMembers);

    //  console.log(peopleService.getPerson(vm.teamMembers[0]).first_name);

    vm.userName = function (id) {

        return peopleService.getPerson(id).first_name;

    };

    //console.log(vm.team.member_ids);

    //vm.team.member_ids.foreach()
    //console.log(peopleService.getPerson(vm.team.member_ids).first_name);


    // console.log(peopleService.getPerson(vm.team.member_ids[0].first_name));
    // vm.teamMember = peopleService.getPerson(vm.team.member_ids[0]);

    // console.log($stateParams.id);
    //vm.teamName = TeamService.getTeam($stateParams.id);

    // console.log(teamService.getAllTeams());

    // console.log( peopleService.getPerson(vm.team));

    //console.log(vm.teamMembers);
    //console.log(vm.teamMembers[0]);


    //vm.TeamMembers.forEach


}

controllersModule.controller('TeamController', ['$stateParams', 'SessionService', 'TeamService', 'PeopleService', TeamController]);
