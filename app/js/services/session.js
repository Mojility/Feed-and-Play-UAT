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
        peopleService.loadCache([person]);
        service.person = person;
        service.token = token;
        requestData();
    };

    // Private

    function requestData() {
        var http = new HttpInteractor();
        http.setSecret(service.token);
        http.get(
            'http://localhost:3000/',
            function(data) {
                loadCaches(data);
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        )
    }

    function loadCaches(data) {
        peopleService.loadCache(data.people);
        peopleService.setApplications(data.applications);
        teamService.loadCache(data.teams);
        teamService.setMemberships(data.team_memberships);
        teamService.setOpenings(data.openings);
    }

    return service;

}

servicesModule.service('SessionService', ['PeopleService', 'TeamService', SessionService]);
