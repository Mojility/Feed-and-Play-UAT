'use strict';
var HttpInteractor = require('../util/http');

var MainGateway = function(sessionService) {

    var gateway = this;
    gateway.openings = null;
    gateway.votes = null;
    gateway.membership = null;
    gateway.openings = [];
    gateway.cache = {};

    gateway.baseYoutubeLink = "https://www.youtube.com/embed/";

    gateway.loadCache = function (team) {

        team.forEach(function (team) {
            gateway.cache[team.id] = team;
        });

    };

    gateway.getYoutubeLink = function (video) {

        return gateway.baseYoutubeLink + video;

    };

    gateway.getAllTeams = function () {

        console.log( gateway.cache);
        return Object.keys(gateway.cache).map(function (p) {
                //console.log(service.cache[p]);
        return gateway.cache[p];
        });

    };

    gateway.setOpenings = function (openings) {

        gateway.openings = openings;

    };

    gateway.setVotes = function (votes) {

        gateway.votes = votes;

    };

    gateway.setMemberships = function (membership) {

        gateway.memberships = membership;

    };

    gateway.getVideos = function (id) {
        //    console.log(service.getTeam(id).videos[0].youtube_link)

        return gateway.getTeam(id).videos;

    };

    gateway.getTeam = function (id) {

        //    console.log(service.cache[id]);

        return gateway.cache[id];

    };

    gateway.getTeamsOfUser = function (id) {


        var teams = [];

        gateway.memberships.forEach(function (member) {

            if (member.person_id === id) {
                 teams.push(member.team_id);

            }

        });

        return teams;
    };

    gateway.getMembersInTeam = function (id) {

        var teamMembers = [];

        gateway.memberships.forEach(function (member) {

            if (member.team_id === id) {
                teamMembers.push(member.person_id);
            }

        });

        //console.log(service.teamMembers);

        return teamMembers;

    };

    gateway.getTeamRole = function (teamId, personId) {

         var foundRole = '';

        gateway.memberships.forEach(function (member) {

            if (member.team_id === teamId && member.person_id === personId) {

                foundRole = member.role;
            }

        });
        //console.log(service.foundRole);
        return foundRole;

    };

    gateway.getOpening = function (id) {

        var foundOpening = '';

        gateway.openings.forEach(function (opening) {

            if (opening.id === id) {

                foundOpening = opening;
            }

        });
        // console.log(foundOpening);
        return foundOpening;

    };



    gateway.deleteAdvertisedRole = function (id, role) {

        var index = gateway.openings.indexOf(role);
        var value = gateway.openings[index].id;
        gateway.openings.splice(index, 1);


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

    gateway.addAdvertisedRole = function (id, role, onComplete) {
        var http = new HttpInteractor();
        http.setSecret(sessionService.token);
        http.put(
            'http://localhost:3000/create_opening',
            {
                team_id: id,
                role: role
            },
            function(data) {
                onComplete(data);
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );
    };

    gateway.getAdvertisedRoles = function (id) {

        var roles = [];

        gateway.openings.forEach(function (opening) {

            if (opening.team_id === id) {
                roles.push(opening);
                // console.log(roles);

            }

        });

        return roles;

    };


    gateway.updateAdvertisedRole = function (id, role, newRole) {

        var roles = gateway.getAdvertisedRoles(id);
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
                gateway.openings.push(data.openings);
                //console.log('opening updated');
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );

    };

    gateway.addMember = function (teamId, personId, role) {

        // service.memberships.push({
        //     "person_id": personId,
        //     "team_id": teamId,
        //     "role": role
        // });

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
                gateway.memberships.push(data.membership);

                //console.log('member added');
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );

    };

    gateway.getScore = function(video) {

      var score = 0;

      gateway.votes.forEach(function (vote) {
         // console.log(vote.video_id);
          if (vote.video_id === video.id) {

              score = score + vote.value;

          }

      });
       //  console.log(score);
       return score;

    };

    gateway.updateVotes = function (video, value, onComplete) {



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

              gateway.votes.push(data.vote);
              onComplete();


          }, function(errorCode) {
              console.log("Error: " + errorCode);
          }
      );


    };

    gateway.getNumberOfVotes = function(video) {

      var value = 0;

      gateway.votes.forEach(function (vote) {
         // console.log(vote.video_id);
          if (vote.video_id === video.id) {

              value = value + 1;

          }

      });
       //  console.log(score);
       return value;

    };


};

module.exports = MainGateway;
