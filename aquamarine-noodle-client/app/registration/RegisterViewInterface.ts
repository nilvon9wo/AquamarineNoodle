import RegistrationInterface from './RegistrationInterface';

interface RegisterViewInterface extends ng.IScope, RegistrationInterface {
    save: () => void;
}

export default RegisterViewInterface