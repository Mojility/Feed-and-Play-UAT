var HttpInteractor = require('../util/http');

var MainGateway = function(sessionService) {

    var gateway = this;

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

    gateway.editAdvertisedRole = function (id, role, newRole) {

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

};

module.exports = MainGateway;

