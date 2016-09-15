/// <reference path='../../declarations/angularjs/angular.d.ts' />

import RegistrationInterface from './RegistrationInterface';

interface RegisterUIControllerInterface extends ng.IScope, RegistrationInterface {
    save: () => void;
}

export default RegisterUIControllerInterface;
