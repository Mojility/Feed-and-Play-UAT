'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function TeamService() {

    var service = {};

    service.baseYoutubeLink = "https://www.youtube.com/embed/";

    service.cache = {};
    // console.log("teamService");

    service.loadCache = function (team) {

        team.forEach(function (team) {
            service.cache[team.team_id] = team;
        });

    };

    service.setMemberships = function (membership) {

        service.memberships = membership;

    };

    service.getVideos = function (id) {

        return service.getTeam(id).video_id;

    };

    service.getYoutubeLink = function (video) {

        return service.baseYoutubeLink + video;

    };

    service.getTeam = function (id) {

        return service.cache[id];

    };

    service.getAllTeams = function () {

        return Object.keys(service.cache).map(function (p) {
            return service.cache[p];
        });

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

    service.getMembersInTeam = function (id) {

        service.teamMembers = [];

        service.memberships.forEach(function (member) {

            if (member.team_id == id) {
                service.teamMembers.push(member.person_id);
            }

        });

        //console.log(service.teamMembers);

        return service.teamMembers;

    };

    service.getTeamsOfUser = function (id) {

        service.teams = [];

        service.memberships.forEach(function (member) {

            if (member.person_id == id) {
                service.teams.push(member.team_id);

            }

        });

        return service.teams;
    };

    service.getLookingForRoles = function (id) {

        return service.getTeam(id).team_roles;

    };

    service.deleteLookingForRole = function (id, role) {

        var roles = service.getLookingForRoles(id);
        var index = roles.indexOf(role);
        roles.splice(index, 1);

    };

    service.addLookingForRole = function (id, role) {

        var roles = service.getLookingForRoles(id);
        roles.push(role);

    };
    return service;

}

servicesModule.service('TeamService', TeamService);
