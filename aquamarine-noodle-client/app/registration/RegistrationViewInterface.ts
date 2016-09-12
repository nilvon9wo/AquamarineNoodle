import RegistrationInterface from './RegistrationInterface';

interface RegistrationViewInterface extends ng.IScope, RegistrationInterface {
    registrations: Array<RegistrationInterface>;
    refresh: () => void;
    save: () => void;
}

export default RegistrationViewInterface