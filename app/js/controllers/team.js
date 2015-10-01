'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($http,$scope,$timeout, sessionService) {

    // ViewModel
    var vm = this;

}

controllersModule.controller('TeamController',['$http', '$scope', '$timeout', 'SessionService',  TeamController]);
