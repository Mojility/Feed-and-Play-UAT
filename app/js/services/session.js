'use strict';

var servicesModule = require('./_index.js');
//var HttpInteractor = require('../util/http');

/**
 * @ngInject
 */
function SessionService() {

    var service = {};

    service.person = null;
    service.token = null;

    service.initialize = function (token, person) {
        service.person = person;
        service.token = token;
        // console.log("initialize session");
        // console.log(service.token);
        // console.log(service.person);
        saveSession();
    };

    service.isValid = function() {
        return service.person !== null && service.token !== null;
    };

    service.invalidate = function() {
        service.person = null;
        service.token = null;
        saveSession();
    };

    // Private

    function saveSession() {
        sessionStorage.token = service.token;
        sessionStorage.person = JSON.stringify(service.person);
    }

    function loadSession() {
        if (sessionStorage.token) {
            service.token = sessionStorage.token;
            service.person = JSON.parse(sessionStorage.person);
            // console.log(service.person);
        }
    }

    loadSession();

    return service;

}

servicesModule.service('SessionService', SessionService);
