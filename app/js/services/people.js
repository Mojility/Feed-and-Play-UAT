'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function PeopleService() {

    var service = {};

    service.cache = {};

    service.loadCache = function (people) {
        people.forEach(function (person) {
            service.cache[person.id] = person;
        });
    };

    service.getPerson = function (id) {
        return service.cache[id];
    };

    service.getAllPeople = function () {
        return Object.keys(service.cache).map(function (p) {
            return service.cache[p];
        });
    };

    service.getFirstName = function (id) {
        return service.cache[id].first_name;
    };

    return service;

}

servicesModule.service('PeopleService', PeopleService);
