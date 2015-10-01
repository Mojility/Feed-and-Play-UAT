'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function SessionService(peopleService) {

    var service = {};

    service.currentUserId = null;

    service.currentUser = function() {
        //console.log("currentUser");
        return peopleService.getPerson(service.currentUserId);
    };

    service.currentUserName = function() {
        //console.log("currentUserName");
        var u = service.currentUser();
        if (u) {
            return u.first_name + " " + u.last_name;
        }
        //console.log(u);
    };

    service.initialize = function (data) {
        peopleService.loadCache(data.people);
        service.currentUserId = data.user.person_id;
    };

    return service;

}

servicesModule.service('SessionService', [ 'PeopleService', SessionService ]);
