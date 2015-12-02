'use strict';

var controllersModule = require('./_index');

function VideoController($stateParams, teamService, peopleService,$scope) {

  var vm = this;

  vm.getYoutubeLink = function () {

      // console.log(vm.video);

      return teamService.getYoutubeLink(vm.video.youtube_link);

  };

  vm.getScore = function() {

    return teamService.getScore(vm.video);

  };

  vm.getNumberOfVotes = function() {

    return teamService.getNumberOfVotes(vm.video);

  };

  vm.like = function() {

      var value = 1;
      teamService.updateVotes(vm.video, value, function() {
        $scope.$apply();
      });
    //  console.log("test");

  };

  vm.dislike = function() {

      var value = -1;
      teamService.updateVotes(vm.video, value,function() {
        $scope.$apply();
      });

  };

  vm.getComments = function() {

    return teamService.getComments(vm.video);

  };

  vm.getFullName = function(personId) {

    // console.log(personId);

    return peopleService.getFullName(personId);

  };

  vm.getAvatar = function(personId) {

    return peopleService.getAvatar(personId);

  };

  function initialize() {

    //  console.log($stateParams.id);

     vm.video = teamService.findVideo($stateParams.id);
    //  console.log(vm.video);

  }

  initialize();

}

controllersModule.controller('VideoController',['$stateParams','TeamService','PeopleService','$scope', VideoController ]);
