'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function ContestService() {

       var service = {};
    service.contests = "";

    service.setContests = function (contests) {

        service.contests = contests;
        // console.log( "test");

    };

    service.getContests = function () {
            // console.log(service.contests);

        return service.contests;

    };

    return service;

  }

servicesModule.service('ContestService', ContestService);
