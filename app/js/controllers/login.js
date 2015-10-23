'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginController($location, peopleService) {

    // ViewModel
    var vm = this;

    vm.email = "";
    vm.password = "";

    vm.buttonEnabled = function () {

        if (vm.email !== "" && vm.password !== "") {
            return true;
        }

    };

    vm.loginUser = function () {


        var userId = peopleService.getUserId(vm.email);
        var person = peopleService.getPerson(userId);


        //console.log(userId);

        if (userId === "") {
            console.log("invalid email");
            //console.log(vm.userId);
            // console.log(userId);
        }
        else {
            if (person.password === vm.password ){
                $location.url("/person/" + userId);
                peopleService.setCurrentUserId(userId);
            }
            else {
                console.log("invalid password");
            }

            // console.log($location.url());
        }

        //console.log(vm.userId);


    };


}

controllersModule.controller('LoginController', ['$location', 'PeopleService', LoginController]);