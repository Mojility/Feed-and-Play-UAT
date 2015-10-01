'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function SessionController(sessionService) {

    // ViewModel
    var vm = this;

    vm.currentUser = sessionService.currentUser;
    console.log(vm.currentUser);

}

controllersModule.controller('SessionController',['SessionService', SessionController]);