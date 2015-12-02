'use strict';

var controllersModule = require('./_index');

var LoginInteractor = require('../interactors/login');

/**
 * @ngInject
 */
function LoginController($scope, $location, cacheService, sessionService) {

    // ViewModel
    var vm = this;

    vm.email = "";
    vm.password = "";

    vm.buttonEnabled = function () {
        if (vm.email !== "" && vm.password !== "")
        {
            return true;
        }
    };

    vm.loginUser = function() {
        var interactor = new LoginInteractor(sessionService, cacheService);
        interactor.loginUser(vm.email, vm.password, function() {
            var url = "/person/" + sessionService.person.id;
            //console.log("Redirecting person to " + url);
            $location.url(url);
            $scope.$apply();
        });
    };

}

controllersModule.controller('LoginController', ['$scope', '$location', 'CacheService', 'SessionService', LoginController]);
