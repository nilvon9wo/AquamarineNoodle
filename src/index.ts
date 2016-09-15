/// <reference path='../declarations/angularjs/angular.d.ts' />
/// <reference path='../declarations/angularjs/angular-route.d.ts' />

'use strict';

import DefaultLogger from './logger/DefaultLogger';
import RegistrationsUIController from './registration/RegistrationsUIController';
import RegisterUIController from './registration/RegisterUIController';

// Declare app level module which depends on views, and components
angular.module('RegistrationApp', ['ngRoute'])
    .factory('$logger', () => new DefaultLogger())
    .controller('RegistrationUIController', RegistrationsUIController)
    .controller('RegisterUIController', RegisterUIController)
    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when('/', {
                controller: 'RegistrationUIController',
                templateUrl: './registration/registrations.html'
            })
            .when('/register', {
                controller: 'RegisterUIController',
                templateUrl: './registration/register.html'
            });
    });
