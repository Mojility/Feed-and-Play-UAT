'use strict';

var servicesModule = require('./_index.js');
var HttpInteractor = require('../util/http');

/**
 * @ngInject
 */
function PeopleService($http,sessionService) {

    var service = {};

    service.cache = {};

    //console.log("peopleService")

    service.loadCache = function (people) {

        service.people = people;

        people.forEach(function (person) {
            service.cache[person.id] = person;
        });

    };

    service.getAllPeople = function () {

        return Object.keys(service.cache).map(function (p) {
            return service.cache[p];
        });

    };

    service.getPerson = function (id) {

        // console.log("test");
        return service.cache[id];

    };

    service.getFirstName = function (id) {

        return service.getPerson(id).first_name;

    };

    service.getFullName = function (id) {

        return service.getPerson(id).first_name + " " + service.getPerson(id).last_name;

    };

    service.setCurrentUserId = function (id) {

        service.currentUserId = id;
        // console.log( "test");

    };

    service.getCurrentUserName = function () {

        // service.setCurrentUserId(0);
        var u = service.getPerson(service.currentUserId);
        // console.log(service.currentUserId);
        if (u) {
            return service.getFullName(service.currentUserId);
        }

    };

    service.getUserId = function (email) {

        var userId = "";

        // console.log(service.people);

        service.people.forEach(function (person) {

            if (person.email === email) {
                userId = person.id;

            }

        });

        return userId;
    };

    service.setApplications = function (applications) {

        service.applications = applications;

    };

    service.getRolesApplied = function (id) {

        //console.log(service.applications);

        var roles = [];
        service.applications.forEach(function (application) {

            if (application.person_id === id) {
                roles.push(application);
                // console.log(roles);

            }

        });

        return roles;

    };

    service.addTeamMembershipApplication = function (role, teamId, personId) {


   //     console.log(personId);

      service.applications.push({
          person_id: personId,
            "team_id": teamId,
            "role": role.role
        });

        var http = new HttpInteractor();
        http.setSecret(sessionService.token);
        http.put(
            'http://localhost:3000/create_application',
            {
                person_id: personId,
                role: role.role,
                team_id: teamId
            },
            function(data) {
                //loadCaches(data);
                //console.log(data);
                service.setApplications(data.application);
                //console.log('application added');
            }, function(errorCode) {
                console.log("Error: " + errorCode);
            }
        );


    };

    service.removeTeamMembershipApplications = function (application) {

        var index = service.applications.indexOf(application);


        var value = service.applications[index].id;
        var id = service.applications[index].opening_id;


        service.applications.forEach(function (application) {

            //  console.log(application);
            if (application.opening_id === id) {
                index = service.applications.indexOf(application);
                value = service.applications[index].id;

                var http = new HttpInteractor();
                http.setSecret(sessionService.token);
                http.delete(
                    'http://localhost:3000/delete_application/' + value,
                    function(data) {
                        //loadCaches(data);
                        //console.log('application deleted');
                    }, function(errorCode) {
                        console.log( errorCode);
                    }
                );

                 service.applications.splice(index);

            }

        });

        // service.applications.splice(index, 1);

        //console.log(value);

    };

    return service;

}

servicesModule.service('PeopleService', ['$http','SessionService', PeopleService]);