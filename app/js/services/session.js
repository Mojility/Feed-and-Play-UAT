'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function SessionService(peopleService, teamService) {

    var service = {};

    service.currentUserId = null;
    service.memberships = {};

    service.currentUser = function () {
        return peopleService.getPerson(service.currentUserId);
    };

    service.currentUserName = function () {
        var u = service.currentUser();
        if (u) {
            return u.first_name + " " + u.last_name;
        }
    };

    service.initialize = function (data) {

        peopleService.loadCache(data.people);
        teamService.loadCache(data.teams);
        service.currentUserId = data.user[0].person_id;
        service.memberships = data.team_memberships;

    };

    return service;

}

servicesModule.service('SessionService', ['PeopleService', 'TeamService', SessionService]);
