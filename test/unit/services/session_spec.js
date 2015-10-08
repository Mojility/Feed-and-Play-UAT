/*global angular */

'use strict';

describe('Unit: SessionService', function() {

    var service;

    beforeEach(function() {
        // instantiate the app module
        angular.mock.module('app');

        // mock the service
        angular.mock.inject(function(SessionService) {
            service = SessionService;
        });
    });

    it('should exist', function() {
        expect(service).toBeDefined();
    });

    it('should load some data and ensure current user is present', function() {

        var person_id = 1;
        var firstName = "John";
        var lastName = "Smith";
        var email = "john@smith.com";

        var data = {
            "user": [
                {
                    "person_id": person_id
                }
            ],
            "teams": [
                {
                    "team_id": 0,
                    "name": "Smith Productions",
                    "video_id": [
                        "gNqQL-1gZF8"
                    ]
                }
            ],
            "people": [
                {
                    "id": person_id,
                    "first_name": firstName,
                    "last_name": lastName,
                    "email": email
                }
            ],
            "team_memberships" : [
                { "person_id": person_id, "team_id": 0, "role": "Lead" }
            ]
        };

        service.initialize(data);
        var currentUser = service.currentUser();

        expect(service.currentUserId).toEqual(person_id);
        expect(currentUser.id).toEqual(person_id);
        expect(currentUser.first_name).toEqual(firstName);
        expect(currentUser.last_name).toEqual(lastName);
        expect(currentUser.email).toEqual(email);

        expect(service.currentUserName()).toEqual("John Smith");

    });

});
