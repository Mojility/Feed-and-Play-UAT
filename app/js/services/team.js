'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function TeamService($http, peopleService) {

    var service = {};

    service.baseYoutubeLink = "https://www.youtube.com/embed/";

    service.cache = {};
    // console.log("teamService");

    service.loadCache = function (team) {

        team.forEach(function (team) {
            service.cache[team.id] = team;
        });

    };

    service.setMemberships = function (membership) {

        service.memberships = membership;

    };

    service.getVideos = function (id) {
        //    console.log(service.getTeam(id).videos[0].youtube_link)

        return service.getTeam(id).videos;

    };

    service.getYoutubeLink = function (video) {

        return service.baseYoutubeLink + video;

    };

    service.getTeam = function (id) {

        //    console.log(service.cache[id]);

        return service.cache[id];

    };

    service.getAllTeams = function () {

        //console.log( service.cache);
        return Object.keys(service.cache).map(function (p) {
            //console.log(service.cache[p]);
            return service.cache[p];
        });

    };

    service.getTeamRole = function (teamId, personId) {

        service.foundRole = '';

        service.memberships.forEach(function (member) {

            if (member.team_id === teamId && member.person_id === personId) {

                service.foundRole = member.role;
            }

        });
        //console.log(service.foundRole);
        return service.foundRole;

    };

    service.getMembersInTeam = function (id) {

        service.teamMembers = [];

        service.memberships.forEach(function (member) {

            if (member.team_id === id) {
                service.teamMembers.push(member.person_id);
            }

        });

        //console.log(service.teamMembers);

        return service.teamMembers;

    };

    service.getTeamsOfUser = function (id) {

        // Request from server, what teams for this user?

        //$http({
        //    method: 'GET',
        //    url: 'http://localhost:3000/'
        //}).then(function successCallback(response) {
        //
        //    // console.log(response.data);
        //    peopleService.loadCache(response.data.people);
        //    service.loadCache(response.data.teams);
        //    service.setMemberships(response.data.team_memberships);
        //
        //}, function errorCallback(response) {
        //
        //    //  console.log(response);
        //    // called asynchronously if an error occurs
        //    // or server returns response with an error status.
        //});

        // Return some data structure from server???
        // -> load the getTeamsOfUser.json data

        // merge that data into what's already in the team / people service

        service.teams = [];

        service.memberships.forEach(function (member) {

            if (member.person_id === id) {
                service.teams.push(member.team_id);

            }

        });

        return service.teams;
    };

    service.getAdvertisedRoles = function (id) {

        // console.log(id);
        //    console.log(service.getTeam(id).team_roles);
        return service.getTeam(id).team_roles;

    };

    service.deleteAdvertisedRole = function (id, role) {

        var roles = service.getAdvertisedRoles(id);
        var index = roles.indexOf(role);
        roles.splice(index, 1);

        console.log(id);
        console.log(role.role);
       var test = role.role;
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/delete_opening',
            data: {
                team_id: id,
                role: role
            }
        }).then(function successCallback(response) {

            console.log('role deleted');

        }, function errorCallback(response) {

              console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    };

    service.addAdvertisedRole = function (id, role) {

        var roles = service.getAdvertisedRoles(id);
        // console.log(roles);
        roles.push({
            "role": role
        });

        $http({
            method: 'PUT',
            url: 'http://localhost:3000/create_opening',
            data: {
                team_id: id,
                role: role
            }
        }).then(function successCallback(response) {

           console.log('role added');

        }, function errorCallback(response) {

              console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    };


    service.editAdvertisedRole = function (id, role, newRole) {

        var roles = service.getAdvertisedRoles(id);
        var index = roles.indexOf(role);

        roles[index].role = newRole;

      //console.log(roles[index]);
      //console.log(id);
      //console.log(role);
      //console.log(roles[index]);

    };


    service.addMember = function (teamId, personId, role) {

        service.memberships.push({
            "person_id": personId,
            "team_id": teamId,
            "role": role
        });


    };


    return service;

}

servicesModule.service('TeamService', ['$http', 'PeopleService', TeamService]);