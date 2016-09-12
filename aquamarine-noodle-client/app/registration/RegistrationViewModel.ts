/// <reference path='../../declarations/angularjs/angularjs.d.ts' />

import DefaultLogger from '../logger/DefaultLogger';
import LoggerInterface from '../logger/LoggerInterface';
import RegistrationInterface from './RegistrationInterface';
import RegistrationViewInterface from './RegistrationViewInterface';
import ViewInterface from '../common/ViewInterface';

class RegistrationsViewModel implements ViewInterface {
    public registrations: Array<RegistrationInterface>;
    private http: ng.IHttpService;
    private logger: DefaultLogger;
    private scope: RegistrationViewInterface;

    constructor($scope: RegistrationViewInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        $scope.registrations = new Array<RegistrationInterface>();
        this.registrations = $scope.registrations;

        $scope.refresh = this.refresh;
        $scope.save = this.save;

        this.scope = $scope;
        this.http = $http;
        this.logger = $logger;
    }

    public refresh() {
        this.logger.log('Requesting...');
        this.http.get<Array<RegistrationInterface>>('/api/registrations')
            .success(registrations => {
                this.registrations.forEach(registration => registrations.push(registration));
            });
    };

    public save() {
        this.http.post('/api/register', {
            age: this.scope.age,
            name: this.scope.name,
            salutation: this.scope.salutation
        },
            { headers: { 'Content-Type': 'application/json' } }
        )
            .success(_ => {
                alert('You are registered!');
            })
            .error(_ => {
                alert('Sorry, not possible!');
            });
    }
}

export default RegistrationsViewModel

