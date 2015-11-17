/*global angular */

'use strict';

describe('Unit: TeamService', function () {

    var session;
    var service;
    var mainGateway;
    var login;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');

        // mock the service
        angular.mock.inject(function (SessionService, TeamService, MainGateway) {
            session = SessionService;
            service = TeamService;
            mainGateway = MainGateway;
            // Login = LoginInteractor ;
        });

        session.initialize(sampleData()); // TODO: Fix with what we actually need!
        // login.loadCaches(sampleData());
        service.setMemberships(sampleData().team_memberships);
        service.loadCache(sampleData().teams);

    });

    it('should exist', function () {
        expect(session).toBeDefined();
        expect(service).toBeDefined();
    });

    it('should retrieve a team by id', function () {

        var team = service.getTeam(0);

        expect(team.id).toEqual(0);
        expect(team.name).toEqual("Smith Productions");
        expect(team.videos[0]).toEqual("gNqQL-1gZF8");

    });

    it('should get videos', function () {

        expect(service.getVideos(0)).toEqual(["gNqQL-1gZF8"]);

    });

    it('should assemble youtube link', function () {

        expect(service.getYoutubeLink("gNqQL-1gZF8")).toEqual("https://www.youtube.com/embed/gNqQL-1gZF8");

    });

    it('should find team role', function () {

        expect(service.getTeamRole(0, 0)).toEqual("Lead");

    });

    it('should find team members', function () {

        expect(service.getMembersInTeam(0)).toEqual([0, 1]);

    });

    it('should find teams', function () {

        expect(service.getTeamsOfUser(0)).toEqual([0, 1]);

    });


    it('should add an advertised role', function() {

        spyOn(mainGateway, 'addAdvertisedRole');
        var ourFunction = function() {};

        var id   = 0;
        var role_name = 'Test';

        service.addAdvertisedRole(id, role_name);

        expect(mainGateway.addAdvertisedRole).toHaveBeenCalledWith(id, role_name);

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
                    "id": 0,
                    "name": "Smith Productions",
                    "videos": [
                        "gNqQL-1gZF8"
                    ]
                },
                {
                    "id": 1,
                    "name": "John Solo",
                    "videos": [
                        "st8-EY71K84"
                    ]
                },
                {
                    "id": 2,
                    "name": "Ze Frank Team",
                    "videos": [
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
