'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function TeamService(mainGateway) {

    var service = {};

    service.memberships = null;
    service.openings = null;
    service.votes = null;

    service.baseYoutubeLink = "https://www.youtube.com/embed/";

    service.openings = [];


    service.cache = {};
    // console.log("teamService");


    service.addAdvertisedRole = function(id, role) {
        service.openings.push({
            "team_id": id,
            "role": role
        });

        mainGateway.addAdvertisedRole(id, role, service.setOpeningsCallback);
    };

    service.setOpeningsCallback = function(data) {
        service.setOpenings(data.opening);
    };


    service.getAllTeams = mainGateway.getAllTeams;
    service.getYoutubeLink = mainGateway.getYoutubeLink;
    service.getVideos = mainGateway.getVideos;
    service.getOpening = mainGateway.getOpening;
    service.getMembersInTeam = mainGateway.getMembersInTeam;
    service.getTeamRole = mainGateway.getTeamRole;
    service.getTeam = mainGateway.getTeam
    service.getTeamsOfUser = mainGateway.getTeamsOfUser;
    service.loadCache = mainGateway.loadCache;
    service.setMemberships = mainGateway.setMemberships;
    service.getNumberOfVotes = mainGateway.getNumberOfVotes;
    service.updateVotes = mainGateway.updateVotes;
    service.getScore = mainGateway.getScore;
    service.setVotes = mainGateway.setVotes;
    service.setOpenings = mainGateway.setOpenings;
    service.getAdvertisedRoles = mainGateway.getAdvertisedRoles;
    service.deleteAdvertisedRole = mainGateway.deleteAdvertisedRole;
    service.updateAdvertisedRole = mainGateway.updateAdvertisedRole;
    service.addMember = mainGateway.addMember;


    return service;

}

servicesModule.service('TeamService', ['MainGateway', TeamService]);
