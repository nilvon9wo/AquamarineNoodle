import RegistrationInterface from './RegistrationInterface';

interface RegistrationsUIControllerInterface extends ng.IScope {
    registrations: Array<RegistrationInterface>;
    refresh: () => void;
}

export default RegistrationsUIControllerInterface;
