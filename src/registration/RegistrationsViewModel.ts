/// <reference path='../../declarations/angularjs/angular.d.ts' />

import LoggerInterface from '../logger/LoggerInterface';
import RegistrationInterface from './RegistrationInterface';
import RegistrationViewInterface from './RegistrationsViewInterface';
import ViewInterface from '../common/ViewInterface';

class RegistrationsViewModel implements ViewInterface {
    constructor($scope: RegistrationViewInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        $scope.registrations = new Array<RegistrationInterface>();
        $scope.refresh = function() {
            console.log('refresh this.logger', $logger);
            $logger.log('Requesting...');
            $http.get<Array<RegistrationInterface>>('/api/registrations')
                .success(registrations => {
                    $scope.registrations.forEach(registration => registrations.push(registration));
                });
        };
    }
}

export default RegistrationsViewModel;
