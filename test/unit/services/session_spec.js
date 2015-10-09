/*global angular */

'use strict';

describe('Unit: SessionService', function () {

    var service;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');

        // mock the service
        angular.mock.inject(function (SessionService) {
            service = SessionService;
        });
    });

    it('should exist', function () {
        expect(service).toBeDefined();
    });

});
