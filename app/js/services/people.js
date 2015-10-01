'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function PeopleService() {

    var service = {};

    service.cache = {};

    service.loadCache = function(people) {
        people.forEach(function(person) {
            service.cache[person.id] = person;
        });
    };

    service.getPerson = function(id) {

        return service.cache[id];

    };

    return service;

}

servicesModule.service('PeopleService', PeopleService);