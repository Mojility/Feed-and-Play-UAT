'use strict';

var controllersModule = require('./_index');

var HttpInteractor = require('../util/http');

/**
 * @ngInject
 */
function LoginController($location, peopleService, sessionService) {

    // ViewModel
    var vm = this;

    vm.email = "";
    vm.password = "";

    vm.buttonEnabled = function () {
        if (vm.email !== "" && vm.password !== "") return true;
    };

    vm.loginUser = function () {

        var http = new HttpInteractor();
        http.post(
            'http://localhost:3000/authenticate',
            {
                email: vm.email,
                password: vm.password
            },
            function(data) {
                var person = data.person;
                var token = data.auth_token;
              //  console.log(data);



                sessionService.initialize(token, person);

                var url = "/person/" + person.id;
                console.log("Redirecting person to " + url);
                $location.url(url);


            },
            function(errorCode) {
                console.log("Problem! " + errorCode);
            }

        );

    };

}

controllersModule.controller('LoginController', ['$location', 'PeopleService', 'SessionService', LoginController]);