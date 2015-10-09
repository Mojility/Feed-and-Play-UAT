'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function TeamService() {

    var service = {};

    service.youtube = "https://www.youtube.com/embed/";

    service.cache = {};
    // console.log("teamService");

    service.loadCache = function (team) {
        team.forEach(function (team) {
            service.cache[team.team_id] = team;
        });

    };

    service.getAllTeams = function () {
        return Object.keys(service.cache).map(function (p) {
            return service.cache[p];
        });
    };

    service.getTeam = function (id) {
        return service.cache[id];

    };

    service.getVideos = function (id) {
        return service.getTeam(id).video_id;

    };

    service.youtubeLink = function (video) {

        return service.youtube + video;

    };

    service.setMemberships = function (membership) {

        service.memberships = membership;

    };

    service.getTeamRole = function (teamId, personId) {

        service.foundRole = '';

        service.memberships.forEach(function (member) {

            if (member.team_id == teamId && member.person_id == personId) {

                service.foundRole = member.role;
            }

        });
        //console.log(service.foundRole);
        return service.foundRole;
    };

    service.getTeamMembers = function (id) {

        service.teamMembers = [];

        service.memberships.forEach(function (member, value) {

            if (member.team_id == id) {
                service.teamMembers.splice(value, 0, member.person_id);
            }

        });

        //console.log(service.teamMembers);

        return service.teamMembers;

    };

    service.getTeams = function (id) {

        service.teams = [];

        service.memberships.forEach(function (member, value) {

            if (member.person_id == id) {
                service.teams.splice(value, 0, member.team_id);

            }

        });

        return service.teams;
    };

    return service;

}

servicesModule.service('TeamService', TeamService);
