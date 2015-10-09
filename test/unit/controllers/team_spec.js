'use strict';

describe('Unit: TeamController', function () {

    var teamController;
    var session;
    var teamService;

    beforeEach(function () {
        // instantiate the app module
        angular.mock.module('app');

        angular.mock.inject(function ($controller,SessionService,TeamService) {
            teamController = $controller('TeamController');
            session = SessionService;
            teamService = TeamService;


        });

        session.initialize(sampleData());
        teamController.team = teamService.getTeam(0);
        teamController.setVariables();
    });

    it('should exist', function () {
        expect(teamController).toBeDefined();
        expect(session).toBeDefined();
        expect(teamService).toBeDefined();

    });

    it('should get youtube link', function () {

        expect(teamController.youtubeLink("abc")).toEqual("https://www.youtube.com/embed/abc");
    });

    it('should have team', function () {

        expect(teamController.team).toNotEqual(undefined);
        expect(teamController.teamName).toEqual("Smith Productions");
        expect(teamController.teamId).toEqual(0);
        expect(teamController.videos).toEqual(["gNqQL-1gZF8"]);
        expect(teamController.teamMembers).toEqual([0,1]);
    });

    it('should get team role', function () {

        expect(teamController.getTeamRole(0)).toEqual("Lead");

    });

    it('should get first name', function () {

        expect(teamController.getFirstName(0)).toEqual("John");

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