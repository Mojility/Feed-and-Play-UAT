'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LoginController($location, peopleService) {

    // ViewModel
    var vm = this;

    vm.firstName = "";
    vm.password = "";

    vm.buttonEnabled = function () {

        if (vm.firstName !== "" && vm.password !== "") {
            return true;
        }

    };

    vm.loginUser = function () {


        var userId = peopleService.getUserId(vm.firstName);

        //console.log(userId);

        if (userId === "") {
            //console.log("fail");
            //console.log(vm.userId);
            // console.log(userId);
        }
        else {
            $location.url("/person/" + userId);
            peopleService.setCurrentUserId(userId);
            // console.log($location.url());
        }

        //console.log(vm.userId);


    };


}

controllersModule.controller('LoginController', ['$location', 'PeopleService', LoginController]);