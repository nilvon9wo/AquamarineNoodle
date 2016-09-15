/// <reference path='../../declarations/angularjs/angular.d.ts' />

import LoggerInterface from '../logger/LoggerInterface';
import RegistrationInterface from './RegistrationInterface';
import RegistrationsUIControllerInterface from './RegistrationsUIControllerInterface';
import UIControllerInterface from '../common/UIControllerInterface';

class RegistrationsUIController implements UIControllerInterface {
    constructor($scope: RegistrationsUIControllerInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        $scope.registrations = new Array<RegistrationInterface>();
        $scope.refresh = function() {
            $logger.log('Requesting...');
            $http.get<Array<RegistrationInterface>>('/api/registrations')
                .success(registrations => {
                    $scope.registrations.forEach(registration => registrations.push(registration));
                });
        };
    }
}

export default RegistrationsUIController;
