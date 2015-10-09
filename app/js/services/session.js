'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function SessionService(peopleService, teamService) {

    var service = {};

    // console.log("session Sevice");

    service.initialize = function (data) {
        // console.log("test");

        peopleService.loadCache(data.people);
        teamService.loadCache(data.teams);
        teamService.setMemberships(data.team_memberships);
        peopleService.setCurrentUserId(data.user[0].person_id);

    };

    return service;

}

servicesModule.service('SessionService', ['PeopleService', 'TeamService', SessionService]);
