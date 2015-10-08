'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function TeamService() {

    var service = {};

    service.cache = {};

    service.loadCache = function (team) {
        team.forEach(function (team) {
            service.cache[team.team_id] = team;
        });

    };

    service.getAllTeams = function () {
        return Object.keys(service.cache).map(function (p) {
            return service.cache[p];
        });
    };
    
    service.getTeam = function (id) {
        return service.cache[id];

    };

    service.getVideos = function (id) {
        return service.cache[id].video_id;

    };

    return service;

}

servicesModule.service('TeamService', TeamService);
