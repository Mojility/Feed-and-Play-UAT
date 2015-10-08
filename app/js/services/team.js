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

    return service;

}

servicesModule.service('TeamService', TeamService);
