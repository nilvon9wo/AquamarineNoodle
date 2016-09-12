/// <reference path='../../declarations/angularjs/angularjs.d.ts' />

import DefaultLogger from '../logger/DefaultLogger';
import LoggerInterface from '../logger/LoggerInterface';
import RegistrationInterface from './RegistrationInterface';
import RegistrationViewInterface from './RegistrationViewInterface';
import ViewInterface from '../common/ViewInterface';

class RegistrationViewModel implements ViewInterface {
    private scope: RegistrationViewInterface;
    private http: ng.IHttpService;
    private logger: DefaultLogger;

    constructor($scope: RegistrationViewInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        this.scope = $scope;
        this.http = $http;
        this.logger = $logger;

        $scope.registrations = new Array<RegistrationInterface>();
        $scope.refresh = this.refresh;
        $scope.save = this.save;
    }

    public refresh() {
        this.logger.log('Requesting...');
        this.http.get<Array<RegistrationInterface>>('/api/registrations')
            .success(registrations => {
                this.scope.registrations.forEach(registration => registrations.push(registration));
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

export default RegistrationViewModel

