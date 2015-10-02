'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($stateParams, peopleService) {

    // ViewModel
    var vm = this;

    vm.person = peopleService.getPerson($stateParams.id);
    //console.log($stateParams.id);
    vm.currentUserName = vm.person.first_name + " " + vm.person.last_name;
    // vm.video = vm.person.videos[0];
    //console.log(vm.video);
    vm.videoId= vm.person.video_id;

}

controllersModule.controller('PersonController', ['$stateParams', 'PeopleService', PersonController]);