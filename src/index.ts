/// <reference path='../declarations/angularjs/angular.d.ts' />
/// <reference path='../declarations/angularjs/angular-route.d.ts' />

'use strict';

import DefaultLogger from './logger/DefaultLogger';
import RegistrationsViewModel from './registration/RegistrationsViewModel';
import RegisterViewModel from './registration/RegisterViewModel';

// Declare app level module which depends on views, and components
angular.module('RegistrationApp', ['ngRoute'])
    .factory('logger', () => new DefaultLogger())
    .controller('RegistrationController', RegistrationsViewModel)
    .controller('RegisterController', RegisterViewModel)
    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when('/', {
                controller: 'RegistrationController',
                templateUrl: 'registrations.html'
            })
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register.html'
            });
    });
