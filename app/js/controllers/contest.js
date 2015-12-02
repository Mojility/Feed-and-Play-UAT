'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ContestController(contestService) {

  var vm = this;

  vm.getContests = function () {

      // console.log(contestService.getContests());

      return contestService.getContests();

  };

}

controllersModule.controller('ContestController', [ 'ContestService', ContestController]);
