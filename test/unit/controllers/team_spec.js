'use strict';

describe('Unit: TeamController', function () {

    var team;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');

        angular.mock.inject(function ($controller) {
            team = $controller('TeamController');
        });
    });

    it('should exist', function () {
        expect(team).toBeDefined();
    });

    it('should get youtube link', function () {

        expect(team.youtubeLink("abc")).toEqual("https://www.youtube.com/embed/abc");
    });


});