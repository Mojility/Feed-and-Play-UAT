'use strict';

var servicesModule = require('./_index.js');
var MainGateway    = require('../gateways/main');

/**
 * @ngInject
 */
function MainGatewayWrapper(sessionService) {
    return new MainGateway(sessionService);
}

servicesModule.service('MainGateway', ['SessionService', MainGatewayWrapper]);
