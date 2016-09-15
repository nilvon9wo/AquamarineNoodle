/// <reference path='../../declarations/angularjs/angular.d.ts' />

import LoggerInterface from '../logger/LoggerInterface';
import RegistrationInterface from './RegistrationInterface';
import RegistrationsUIControllerInterface from './RegistrationsUIControllerInterface';
import UIControllerInterface from '../common/UIControllerInterface';

class RegistrationsUIController implements UIControllerInterface {
    constructor($scope: RegistrationsUIControllerInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        $scope.registrations = new Array<RegistrationInterface>();
        this.getRegistrations($scope, $http);
        $scope.refresh = () => {
            $logger.log('Requesting...');
            this.getRegistrations($scope, $http);
        };
    }

    private getRegistrations($scope: RegistrationsUIControllerInterface, $http: ng.IHttpService) {
            $http.get<Array<RegistrationInterface>>('/api/registrations')
                .success(registrations => registrations.forEach(registration => $scope.registrations.push(registration)));
    }
}

export default RegistrationsUIController;
