'use strict';

describe('Unit: PersonController', function () {

    var person;
    var people;
    var session;


    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');

        angular.mock.inject(function ($controller,SessionService,PeopleService) {
            person = $controller('PersonController');
            session = SessionService;
            people = PeopleService;
        });

        session.initialize(sampleData());
        person.person = people.getPerson(0);
        person.setVariables();
    });

    it('should exist', function () {
        expect(person).toBeDefined();
        expect(people).toBeDefined();
        expect(session).toBeDefined();
    });

    it('should get youtube link', function () {

        expect(person.youtubeLink("abc")).toEqual("https://www.youtube.com/embed/abc");
    });

    it('should get videos', function () {

        expect(person.getVideos(0)).toEqual(["gNqQL-1gZF8"]);
    });

    it('should get team name', function () {

        expect(person.teamName(0)).toEqual("Smith Productions");
    });

    it('should get team role', function () {

        expect(person.teamRole(0)).toEqual("Lead");
    });

    it('should have person', function () {

        expect(person.person).toNotEqual(undefined);
        expect(person.personId).toEqual(0);
        expect(person.currentUserName).toEqual("John Smith");
        expect(person.teams).toEqual([0,1]);
        //expect(teamController.teamMembers).toEqual([0,1]);
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