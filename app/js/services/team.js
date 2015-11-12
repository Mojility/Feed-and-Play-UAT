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

    service.setVotes = function (votes) {

        service.votes = votes;

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

    service.deleteAdvertisedRole = mainGateway.deleteAdvertisedRole;
    service.editAdvertisedRole = mainGateway.editAdvertisedRole;
    service.addMember = mainGateway.addMember;

    service.updateVotes = function (video, value, onComplete) {



      var http = new HttpInteractor();
      http.setSecret(sessionService.token);
      http.put(
          'http://localhost:3000/createVotes',
          {
                    video_id: video.id,
                    value: value,
                    person_id: sessionService.person.id
          },
          function(data) {

              service.votes.push(data.vote);
              onComplete();


          }, function(errorCode) {
              console.log("Error: " + errorCode);
          }
      );


    };

   service.getScore = function(video) {

     var score = 0;

     service.votes.forEach(function (vote) {
        // console.log(vote.video_id);
         if (vote.video_id === video.id) {

             score = score + vote.value;

         };

     });
      //  console.log(score);
      return score;

   };

   service.getNumberOfVotes = function(video) {

     var value = 0;

     service.votes.forEach(function (vote) {
        // console.log(vote.video_id);
         if (vote.video_id === video.id) {

             value = value + 1;

         };

     });
      //  console.log(score);
      return value;

   };


    return service;

}

servicesModule.service('TeamService', ['MainGateway', TeamService]);
