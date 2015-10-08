'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function PeopleService() {

    var service = {};

    service.cache = {};

    //console.log("peopleService")

    service.loadCache = function (people) {
        people.forEach(function (person) {
            service.cache[person.id] = person;
        });
    };

    service.getAllPeople = function () {
        return Object.keys(service.cache).map(function (p) {
            return service.cache[p];
        });
    };

    service.getPerson = function (id) {

        // console.log("test");
        return service.cache[id];

    };


    service.getFirstName = function (id) {
        return service.getPerson(id).first_name;
    };

    service.currentUser = function () {
        return service.getPerson(service.currentUserId);
        //console.log("test");
    };

    service.setCurrentUserId = function (id) {
        service.currentUserId = id;
        // console.log( "test");
    };

    service.currentUserName = function () {
        // service.setCurrentUserId(0);
        var u = service.getPerson(service.currentUserId);
        // console.log(u);
        if (u) {
            return u.first_name + " " + u.last_name;
        }
    };

    return service;

}

servicesModule.service('PeopleService', PeopleService);
