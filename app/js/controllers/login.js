'use strict';

var controllersModule = require('./_index');

var LoginInteractor = require('../interactors/login');

/**
 * @ngInject
 */
function LoginController($scope, $location, peopleService, sessionService, teamService) {

    // ViewModel
    var vm = this;

    vm.email = "";
    vm.password = "";

    vm.buttonEnabled = function () {
        if (vm.email !== "" && vm.password !== "") return true;
    };

    vm.loginUser = function() {
        var interactor = new LoginInteractor(sessionService, peopleService, teamService);
        interactor.loginUser(vm.email, vm.password, function(id) {
            var url = "/person/" + id;
            console.log("Redirecting person to " + url);
            $location.url(url);
            $scope.$apply();
        });
    }

}

controllersModule.controller('LoginController', ['$scope', '$location', 'PeopleService', 'SessionService', 'TeamService', LoginController]);