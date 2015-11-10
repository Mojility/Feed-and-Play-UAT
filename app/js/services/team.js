'use strict';

var servicesModule = require('./_index.js');
var HttpInteractor = require('../util/http');

/**
 * @ngInject
 */
function TeamService($http,sessionService) {

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

    service.setOpenings = function (openings) {

        service.openings = openings;

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


        console.log( service.cache);
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


    service.getOpening = function (id) {


        var foundOpening = '';

        service.openings.forEach(function (opening) {

            if (opening.id === id) {

                foundOpening = opening;
            }

        });
        // console.log(foundOpening);
        return foundOpening;

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

        var roles = [];

        service.openings.forEach(function (opening) {

            if (opening.team_id === id) {
                roles.push(opening);
                // console.log(roles);

            }

        });

        return roles;

    };

    service.deleteAdvertisedRole = function (id, role) {

        var index = service.openings.indexOf(role);
        var value = service.openings[index].id;
        service.openings.splice(index, 1);


        var http = new HttpInteractor();
        http.setSecret(sessionService.token);
        http.delete(
            'http://localhost:3000/delete_opening/' + value,
            function(data) {
                //loadCaches(data);
                //console.log('opening deleted');
            }, function(errorCode) {
                console.log( errorCode);
            }
        );

    };

    service.addAdvertisedRole = function (id, role) {

        //var roles = service.getAdvertisedRoles(id);

        service.openings.push({
            "team_id": id,
            "role": role
        });

        var http = new HttpInteractor();
        http.setSecret(sessionService.token);
        http.put(
            'http://localhost:3000/create_opening',
            {
                team_id: id,
                role: role
            },
            function(data) {
                //loadCaches(data.opening);
           //     console.log(data);
                service.setOpenings(data.opening);
                console.log(data.opening);
                console.log('opening added');
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );
    };

    service.editAdvertisedRole = function (id, role, newRole) {

        var roles = service.getAdvertisedRoles(id);
        var index = roles.indexOf(role);
        var value = roles[index].id;

        roles[index].role = newRole;

        var http = new HttpInteractor();
        http.setSecret(sessionService.token);
        http.post(
            'http://localhost:3000/update/' + newRole + "/" + value,
            {
                role: newRole
            },
            function(data) {
              //  loadCaches(data.opening);
                service.openings.push(data.openings);
                //console.log('opening updated');
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );

    };

    service.addMember = function (teamId, personId, role) {

        var http = new HttpInteractor();
        http.setSecret(sessionService.token);
        http.put(
            'http://localhost:3000/create_membership',
            {
                        person_id: personId,
                        team_id: teamId,
                        role: role
            },
            function(data) {
                //loadCaches(data);
                service.memberships.push(data.membership);

                //console.log('member added');
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );

    };

    service.updateVotes = function (video) {



      var http = new HttpInteractor();
      http.setSecret(sessionService.token);
      http.post(
          'http://localhost:3000/updateVotes',
          {
                    id: video.id,
                    votes: video.votes
          },
          function(data) {
              //loadCaches(data);
            //  service.memberships.push(data.membership);

          //    console.log('votes updated');
          }, function(errorCode) {
              console.log("Error: " + errorCode);
          }
      );


    };



    return service;

}

servicesModule.service('TeamService', ['$http','SessionService', TeamService]);
