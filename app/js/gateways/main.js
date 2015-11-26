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

    gateway.deleteAdvertisedRole = function (value) {

        var http = new HttpInteractor();
        http.setSecret(sessionService.token);
        http.delete(
            'http://localhost:3000/delete_opening/' + value,
            function(data) {

                // onComplete(data);

            }, function(errorCode) {
                console.log( errorCode);
            }
        );

    };

    gateway.addAdvertisedRole = function (id, role) {
        var http = new HttpInteractor();
        http.setSecret(sessionService.token);
        http.put(
            'http://localhost:3000/create_opening',
            {
                team_id: id,
                role: role
            },
            function(data) {
                // onComplete(data);
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );
    };

    gateway.updateAdvertisedRole = function (value, newRole) {

        var http = new HttpInteractor();
        http.setSecret(sessionService.token);
        http.post(
            'http://localhost:3000/update/' + newRole + "/" + value,
            {
                role: newRole
            },
            function(data) {

                  // onComplete(data);
                //console.log('opening updated');
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );

    };

    gateway.addMember = function (teamId, personId, role) {

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
                console.log(data);
                // onComplete(data);

                //console.log('member added');
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );

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

            //  console.log(data.vote);
               onComplete(data);

          }, function(errorCode) {
              console.log("Error: " + errorCode);
          }
      );

    };

    gateway.addContest = function (title,description,dueDate,rules) {

      var http = new HttpInteractor();
      http.setSecret(sessionService.token);
      http.put(
          'http://localhost:3000/create_contest',
          {
                    title: title,
                    description: description,
                    dueDate: dueDate,
                    rules: rules
          },
          function(data) {

            //  console.log(data.vote);
              //  onComplete(data);
              console.log("contest added")

          }, function(errorCode) {
              console.log("Error: " + errorCode);
          }
      );

    };

};

module.exports = MainGateway;
