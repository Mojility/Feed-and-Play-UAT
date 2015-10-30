'use strict';

var servicesModule = require('./_index.js');
var HttpInteractor = require('../util/http');

/**
 * @ngInject
 */
function SessionService(peopleService, teamService) {

    var service = {};

    service.person = null;
    service.token = null;

    service.initialize = function (token, person) {
        service.person = person;
        service.token = token;
    };

    // Private

    return service;

}

servicesModule.service('SessionService', ['PeopleService', 'TeamService', SessionService]);
