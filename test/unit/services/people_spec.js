/*global angular */

'use strict';

describe('Unit: PeopleService', function() {

    var session;
    var service;

    beforeEach(function() {
        // instantiate the app module
        angular.mock.module('app');

        // mock the service
        angular.mock.inject(function(SessionService, PeopleService) {
            session = SessionService;
            service = PeopleService;
        });

        session.initialize(sampleData());
    });

    it('should exist', function() {
        expect(session).toBeDefined();
        expect(service).toBeDefined();
    });

    it('should retrieve a person by id', function() {
        var person = service.getPerson(2);
        var firstName = service.getFirstName(2);
        var fullName = service.getFullName(2);

        expect(person.id).toEqual(2);
        expect(person.first_name).toEqual("Ze");
        expect(person.last_name).toEqual("Frank");
        expect(person.email).toEqual("ze@frank.com");
        expect(firstName).toEqual("Ze");
        expect(fullName).toEqual("Ze Frank");


    });

    it('should get name on logged in user', function() {

        var currentUserName = service.currentUserName();

        expect(currentUserName).toEqual("John Smith");

    });


    it('should set current user id', function() {

       service.setCurrentUserId(1);

        expect(service.currentUserId).toEqual(1);

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
                        "110iUX1Ursk","GDwOi7HpHtQ", "ndQZBQJf034"
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
            "team_memberships" : [
                { "person_id": 0, "team_id": 0, "role": "Lead" },
                { "person_id": 0, "team_id": 1, "role": "Lead" },
                { "person_id": 1, "team_id": 0, "role": "Writer" },
                { "person_id": 2, "team_id": 2, "role": "Lead" }
            ]
        };
    }

});
