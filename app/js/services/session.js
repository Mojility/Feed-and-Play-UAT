'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function SessionService(peopleService, teamService) {

    var service = {};

    // service.currentUserId = null;

    // console.log("session Sevice");

    service.initialize = function (data) {
        // console.log("test");

        peopleService.loadCache(data.people);
        teamService.loadCache(data.teams);
        peopleService.setCurrentUserId(data.user[0].person_id);

        service.memberships = data.team_memberships;

    };

    return service;

}

servicesModule.service('SessionService', ['PeopleService', 'TeamService', SessionService]);
