'use strict';

var servicesModule = require('./_index.js');
var CacheInteractor = require('../interactors/cache');

/**
 * @ngInject
 */
function CacheService(sessionService, peopleService, teamService, contestService) {
    return new CacheInteractor(sessionService, peopleService, teamService, contestService);
}

servicesModule.service('CacheService', ['SessionService', 'PeopleService', 'TeamService', 'ContestService', CacheService]);
