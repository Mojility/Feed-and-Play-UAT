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
            service.cache[team.id] = team;
        });
    };

    service.getTeam = function (id) {
        //console.log(service.cache);
        //console.log(id);
        return service.cache[id];
    };

    service.getAllTeams = function() {
        return Object.keys(service.cache).map(function(p) {
            return service.cache[p];
        });
    };

    return service;

}

servicesModule.service('TeamService', TeamService);
