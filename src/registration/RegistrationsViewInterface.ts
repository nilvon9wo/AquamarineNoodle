import RegistrationInterface from './RegistrationInterface';

interface RegistrationsViewInterface extends ng.IScope {
    registrations: Array<RegistrationInterface>;
    refresh: () => void;
}

export default RegistrationsViewInterface;
