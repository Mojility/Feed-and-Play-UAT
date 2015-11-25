'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function SessionController($location, session) {

    // ViewModel
    var vm = this;

    vm.isValid = function() {
        return session.isValid();
    };

    vm.isNotValid = function() {
        return !session.isValid();
    };

    vm.userClickedLogOut = function() {
        session.invalidate();
        $location.path('/');
    };

    //vm.currentUserName = peopleService.getCurrentUserName;
    //vm.allPeople = peopleService.getAllPeople;
    //vm.allTeams = teamService.getAllTeams;

}

controllersModule.controller('SessionController', ['$location', 'SessionService', SessionController] );
