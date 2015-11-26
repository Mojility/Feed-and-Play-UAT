'use strict';

var servicesModule = require('./_index.js');
var CacheInteractor = require('../interactors/cache');

/**
 * @ngInject
 */
function CacheService(sessionService, peopleService, teamService) {
    return new CacheInteractor(sessionService, peopleService, teamService);
}

servicesModule.service('CacheService', ['SessionService', 'PeopleService', 'TeamService', CacheService]);
