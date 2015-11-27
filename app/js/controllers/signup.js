'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function SignupController(peopleService) {

  var vm = this;

  vm.stageName = "";
  vm.firstName = "";
  vm.lastName = "";
  vm.email = "";
  vm.password = "";

  vm.addPerson = function () {

       console.log("add person");
      peopleService.addPerson(vm.stageName,vm.firstName,vm.lastName,vm.email,vm.password);

  };

  vm.signupEnabled = function () {

      if (vm.stageName !== "" && vm.firstName !== "" && vm.lastName !== "" && vm.email !== "" && vm.password !== "") {
          return true;
      }
  };

}

controllersModule.controller('SignupController', [ 'PeopleService', SignupController]);
