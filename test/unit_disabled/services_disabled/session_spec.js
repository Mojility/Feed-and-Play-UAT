/*global angular */

'use strict';

describe('Unit: SessionService', function () {

    var service;
    var team;
    var people;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');

        // mock the service
        angular.mock.inject(function (SessionService, TeamService, PeopleService) {
            service = SessionService;
            team = TeamService;
            people = PeopleService;

        });

        service.initialize(sampleData());
    });

    it('should exist', function () {
        expect(service).toBeDefined();
        expect(team).toBeDefined();
        expect(people).toBeDefined();
    });

    it('should load cache', function () {


        expect(team.cache).toNotEqual(null);
        expect(people.cache).toNotEqual(null);


    });
    function sampleData() {
        return {
            "user": [
                {
                    "person_id": 0
                }
            ],
            "teams": [
                {
                    "team_id": 0,
                    "name": "Smith Productions",
                    "video_id": [
                        "gNqQL-1gZF8"
                    ]
                },
                {
                    "team_id": 1,
                    "name": "John Solo",
                    "video_id": [
                        "st8-EY71K84"
                    ]
                },
                {
                    "team_id": 2,
                    "name": "Ze Frank Team",
                    "video_id": [
                        "110iUX1Ursk", "GDwOi7HpHtQ", "ndQZBQJf034"
                    ]
                }
            ],
            "people": [
                {
                    "id": 0,
                    "first_name": "John",
                    "last_name": "Smith",
                    "email": "john@smith.com"
                },
                {
                    "id": 1,
                    "first_name": "Sally",
                    "last_name": "Johnson",
                    "email": "sally@johnson.com"
                },
                {
                    "id": 2,
                    "first_name": "Ze",
                    "last_name": "Frank",
                    "email": "ze@frank.com"
                }
            ],
            "team_memberships": [
                {"person_id": 0, "team_id": 0, "role": "Lead"},
                {"person_id": 0, "team_id": 1, "role": "Lead"},
                {"person_id": 1, "team_id": 0, "role": "Writer"},
                {"person_id": 2, "team_id": 2, "role": "Lead"}
            ]
        };
    }

});
