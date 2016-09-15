/// <reference path='../../declarations/angularjs/angular.d.ts' />

import LoggerInterface from '../logger/LoggerInterface';
import RegisterViewInterface from './RegisterViewInterface';
import ViewInterface from '../common/ViewInterface';

class RegisterViewModel implements ViewInterface {
    private scope: RegisterViewInterface;
    private http: ng.IHttpService;
    private logger: LoggerInterface;

    constructor($scope: RegisterViewInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        this.scope = $scope;
        this.http = $http;
        this.logger = $logger;

        $scope.save = this.save;
    }

    public save() {
        this.logger.log('Saving...');
        this.http.post('/api/register', {
            age: this.scope.age,
            name: this.scope.name,
            salutation: this.scope.salutation
        },
            { headers: { 'Content-Type': 'application/json' } }
        )
            .success(_ => {
                alert('You are registered!');
                this.logger.log('Saving Success.');
            })
            .error(_ => {
                alert('Sorry, not possible!');
                this.logger.log('Saving Failed.');
            });
    }
}

export default RegisterViewModel;
