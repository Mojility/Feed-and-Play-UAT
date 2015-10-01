'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function SessionService(peopleService) {

    var service = {};

    service.currentUser = null;

    service.initialize = function (data) {
        peopleService.loadCache(data.people);
        service.currentUser = peopleService.getPerson(data.user.person_id);

    };

    return service;

}

servicesModule.service('SessionService', [ 'PeopleService', SessionService ]);