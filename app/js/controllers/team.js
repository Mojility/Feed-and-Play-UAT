'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function TeamController($http) {

    // ViewModel
    var vm = this;

    $http({
        method: 'GET',
        url: 'data/profile.json'
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });


}

controllersModule.controller('TeamController',['$http', TeamController]);