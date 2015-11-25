'use strict';
var HttpInteractor = require('../util/http');

function CacheInteractor(sessionService, peopleService, teamService) {

    var interactor = this;

    var hasPrimed = false;

    interactor.requestData = function(didCompleteFunction) {
        interactor.hasPrimed = true;
        var http = new HttpInteractor();
        //console.log(sessionService.token);
        http.setSecret(sessionService.token);
        http.get(
            'http://localhost:3000/',
            function(data) {
                 console.log(data);
                loadCaches(data, didCompleteFunction);
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );
    };

    function loadCaches(data, didCompleteFunction) {
        // console.log(data);

        peopleService.loadCache(data.people);
        peopleService.setApplications(data.applications);

        // console.log(data.teams);

        teamService.loadCache(data.teams);
        teamService.setMemberships(data.team_memberships);
        teamService.setOpenings(data.openings);
        teamService.setVotes(data.votes);
        teamService.setVideos(data.videos);
        teamService.setComments(data.comments);

        didCompleteFunction();
    }

}

module.exports = CacheInteractor;