/// <reference path='../../declarations/angularjs/angular.d.ts' />

import LoggerInterface from '../logger/LoggerInterface';
import RegistrationInterface from './RegistrationInterface';
import RegistrationViewInterface from './RegistrationsViewInterface';
import ViewInterface from '../common/ViewInterface';

class RegistrationsViewModel implements ViewInterface {
    private scope: RegistrationViewInterface;
    private http: ng.IHttpService;
    private logger: LoggerInterface;

    constructor($scope: RegistrationViewInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        this.scope = $scope;
        this.http = $http;
        this.logger = $logger;

        $scope.registrations = new Array<RegistrationInterface>();
        $scope.refresh = this.refresh;
    }

    public refresh() {
        this.logger.log('Requesting...');
        this.http.get<Array<RegistrationInterface>>('/api/registrations')
            .success(registrations => {
                this.scope.registrations.forEach(registration => registrations.push(registration));
            });
    };
}

export default RegistrationsViewModel;
