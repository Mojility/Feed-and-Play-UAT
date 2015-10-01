'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($http,$scope,$timeout, sessionService) {

    // ViewModel
    var vm = this;

    $http({
        method: 'GET',
        url: 'data/profile.json'
    }).then(function successCallback(response) {

        $timeout(function() {

            sessionService.initialize(response.data);
            $scope.$apply();

        });

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });




}

controllersModule.controller('TeamController',['$http', '$scope', '$timeout', 'SessionService',  TeamController]);