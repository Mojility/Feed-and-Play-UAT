'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function PeopleService($http) {

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

    service.getRolesApplied = function (id) {

        return service.getPerson(id).role_applied;

    };

    service.addTeamMembershipApplication = function (role, teamId, personId) {

        var rolesApplied = service.getRolesApplied(personId);

        rolesApplied.push({
            "team_id": teamId,
            "role": role.role
        });

        $http({
            method: 'PUT',
            url: 'http://localhost:3000/create_application',
            data: {
                person_id: personId,
                role: role.role,
                team_id: teamId
            }
        }).then(function successCallback(response) {

            console.log('application added');

        }, function errorCallback(response) {

            console.log(response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    };

    service.removeTeamMembershipApplications = function (role, personId) {

        var rolesApplied = service.getRolesApplied(personId);

        // console.log(rolesApplied);


        var index = rolesApplied.indexOf(role);
        // console.log(index);
        rolesApplied.splice(index, 1);

    };

    return service;

}

servicesModule.service('PeopleService',['$http', PeopleService]);