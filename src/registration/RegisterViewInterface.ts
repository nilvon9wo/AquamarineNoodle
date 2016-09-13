/// <reference path='../../declarations/angularjs/angular.d.ts' />

import RegistrationInterface from './RegistrationInterface';

interface RegisterViewInterface extends ng.IScope, RegistrationInterface {
    save: () => void;
}

export default RegisterViewInterface;
