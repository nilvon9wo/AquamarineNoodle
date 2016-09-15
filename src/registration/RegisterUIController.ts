/// <reference path='../../declarations/angularjs/angular.d.ts' />

import LoggerInterface from '../logger/LoggerInterface';
import RegisterUIControllerInterface from './RegisterUIControllerInterface';
import UIControllerInterface from '../common/UIControllerInterface';

class RegisterUIController implements UIControllerInterface {

    constructor($scope: RegisterUIControllerInterface, $http: ng.IHttpService, private $logger: LoggerInterface) {
        $scope.save = function() {
            $logger.log('Saving...');
            $http.post('/api/register', {
                age: $scope.age,
                name: $scope.name,
                salutation: $scope.salutation
            },
                { headers: { 'Content-Type': 'application/json' } }
            )
                .success(_ => {
                    alert('You are registered!');
                    $logger.log('Saving Success.');
                })
                .error(_ => {
                    alert('Sorry, not possible!');
                    $logger.log('Saving Failed.');
                });
        };
    }
}

export default RegisterUIController;
