'use strict';
var HttpInteractor = require('../util/http');

function LoginInteractor(sessionService, cacheService) {

    var interactor = this;

    interactor.loginUser = function (email, password, didCompleteFunction) {

        var http = new HttpInteractor();
        http.post(
            'http://localhost:3000/authenticate',
            {
                email: email,
                password: password
            },
            function(data) {
                sessionService.initialize(data.person.auth_token, data.person);
                cacheService.requestData(didCompleteFunction);
            },
            function(errorCode) {
                console.log("Problem! " + errorCode);
            }

        );

    };

}

module.exports = LoginInteractor;
