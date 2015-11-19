'use strict';
var HttpInteractor = require('../util/http');

function LoginInteractor(sessionService, peopleService, teamService) {

    var interactor = this;

    interactor.person = null;
    interactor.token = null;
    interactor.didCompleteFunction = null;

    interactor.loginUser = function (email, password, didCompleteFunction) {

        var http = new HttpInteractor();
        http.post(
            'http://localhost:3000/authenticate',
            {
                email: email,
                password: password
            },
            function(data) {
                interactor.person = data.person;
                interactor.token = data.auth_token;
                interactor.didCompleteFunction = didCompleteFunction;
                requestData();
            },
            function(errorCode) {
                console.log("Problem! " + errorCode);
            }

        );

    };

    function requestData() {
        var http = new HttpInteractor();
        http.setSecret(interactor.token);
        http.get(
            'http://localhost:3000/',
            function(data) {
                // console.log(data);
                loadCaches(data);
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );
    }

    function loadCaches(data) {
        // console.log(data);
        sessionService.initialize(interactor.token, interactor.person);

        peopleService.loadCache([interactor.person]);

        peopleService.loadCache(data.people);
        peopleService.setApplications(data.applications);

        // console.log(data.teams);

        teamService.loadCache(data.teams);
        teamService.setMemberships(data.team_memberships);
        teamService.setOpenings(data.openings);
        teamService.setVotes(data.votes);
        teamService.setVideos(data.videos);
        teamService.setComments(data.comments);

        interactor.didCompleteFunction(interactor.person.id);
    }

}

module.exports = LoginInteractor;
