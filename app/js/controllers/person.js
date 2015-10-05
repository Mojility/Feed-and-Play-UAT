'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function PersonController($stateParams, peopleService) {

    // ViewModel
    var vm = this;


    vm.personIsNotEmpty = function () {

        vm.person = peopleService.getPerson($stateParams.id);

        if (vm.person != null){

            vm.setVariables();
            return true;
        }
        else {

            return false;
        }

    };

    vm.setVariables = function () {

        vm.currentUserName = vm.person.first_name + " " + vm.person.last_name;


    };

}

controllersModule.controller('PersonController', ['$stateParams', 'PeopleService', PersonController]);