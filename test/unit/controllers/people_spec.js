'use strict';

describe('Unit: PersonController', function () {

    var person;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');

        angular.mock.inject(function ($controller) {
            person = $controller('PersonController');
        });
    });

    it('should exist', function () {
        expect(person).toBeDefined();
    });

    it('should get youtube link', function () {

        expect(person.youtubeLink("abc")).toEqual("https://www.youtube.com/embed/abc");
    });


});