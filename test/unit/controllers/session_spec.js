'use strict';

describe('Unit: SessionController', function () {

    var session;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');

        angular.mock.inject(function ($controller) {
            session = $controller('SessionController');
        });
    });

    it('should exist', function () {
        expect(session).toBeDefined();
    });

});