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

    service.getYoutubeLink = function (video) {

        return service.baseYoutubeLink + video;

    };

    service.addAdvertisedRole = function(id, role) {
        service.openings.push({
            "team_id": id,
            "role": role
        });

        mainGateway.addAdvertisedRole(id, role);
    };

    service.setOpeningsCallback = function(data) {
        service.setOpenings(data.opening);
    };

    service.getAllTeams = function () {

        // console.log( service.cache);
        return Object.keys(service.cache).map(function (p) {
                //console.log(service.cache[p]);
                return service.cache[p];
        });

    };

    service.setOpenings = function (openings) {

      service.openings = openings;

    };

    service.setVotes = function (votes) {

        service.votes = votes;

    };

    service.setMemberships = function (membership) {

        service.memberships = membership;

    };

    service.getVideos = function (id) {
        //    console.log(service.getTeam(id).videos[0].youtube_link)

        return service.getTeam(id).videos;

    };

    service.getTeam = function (id) {

        //    console.log(service.cache[id]);

        return service.cache[id];

    };

    service.getTeamsOfUser = function (id) {

        var teams = [];

        service.memberships.forEach(function (member) {

            if (member.person_id === id) {
                 teams.push(member.team_id);

            }

        });

        return teams;
    };

    service.getMembersInTeam = function (id) {

        var teamMembers = [];

        service.memberships.forEach(function (member) {

            if (member.team_id === id) {
                teamMembers.push(member.person_id);
            }

        });

        //console.log(service.teamMembers);

        return teamMembers;

    };

    service.getTeamRole = function (teamId, personId) {

         var foundRole = '';

        service.memberships.forEach(function (member) {

            if (member.team_id === teamId && member.person_id === personId) {

                foundRole = member.role;
            }

        });
        //console.log(service.foundRole);
        return foundRole;

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

    service.getScore = function(video) {

      var score = 0;

      service.votes.forEach(function (vote) {
         // console.log(vote.video_id);
          if (vote.video_id === video.id) {

              score = score + vote.value;

          }

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

          }

      });
       //  console.log(score);
       return value;

    };

    service.deleteAdvertisedRole = function (id, role){

      var index = service.openings.indexOf(role);
      var value = service.openings[index].id;
      service.openings.splice(index, 1);

      mainGateway.deleteAdvertisedRole(value);

    };

    service.updateAdvertisedRole = function (id, role, newRole){

      var roles = service.getAdvertisedRoles(id);
      var index = roles.indexOf(role);
      var value = roles[index].id;

      roles[index].role = newRole;

      mainGateway.updateAdvertisedRole(value, newRole);

    };

    service.setVotesCallback = function (data){
      service.setVotes(data.votes);
    };

    service.addMember = function (teamId,personId,role)  {

      mainGateway.addMember(teamId,personId,role,service.locaCacheCallback);

    };

    service.loadCacheCallback = function (data){
      service.setVotes(data);
    };

    service.isLeader = function (teamId,personId){
        var leadership = null;



        service.memberships.forEach(function (member) {

          //  console.log(member);

            if (member.team_id === teamId && member.person_id === personId) {

                //  console.log(member);

                leadership = member.leader;
            }

        });

        return  leadership;
    };

    service.updateVotes = function (video,value){

      // service.votes.push({
      //   video_id: video.id,
      //   value: value,
      //   person_id: sessionService.person.id
      // })
      mainGateway.updateVotes(video,value, service.pushVotesCallback);

    };

    service.pushVotesCallback = function(data){

       service.votes.push(data.vote);

    };

    // service.getAllTeams = mainGateway.getAllTeams;
    // service.getYoutubeLink = mainGateway.getYoutubeLink;
    // service.getVideos = mainGateway.getVideos;
    // service.getOpening = mainGateway.getOpening;
    // service.getMembersInTeam = mainGateway.getMembersInTeam;
    // service.getTeamRole = mainGateway.getTeamRole;
    // service.getTeam = mainGateway.getTeam
    // service.getTeamsOfUser = mainGateway.getTeamsOfUser;
    // service.loadCache = mainGateway.loadCache
    // service.setMemberships = mainGateway.setMemberships;
    // service.getNumberOfVotes = mainGateway.getNumberOfVotes;
    // service.getScore = mainGateway.getScore;
    // service.setVotes = mainGateway.setVotes;
    // service.setOpenings = mainGateway.setOpenings;
    // service.getAdvertisedRoles = mainGateway.getAdvertisedRoles;

    return service;

}

servicesModule.service('TeamService', ['MainGateway', TeamService]);
