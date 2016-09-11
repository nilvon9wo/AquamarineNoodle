import DaoInterface from '../common/DaoInterface';
import RegistrationInterface from '../registration/RegistrationInterface';

class RegistrationDao implements DaoInterface {
    private registrations: Array<RegistrationInterface> = new Array<RegistrationInterface>();

    constructor() {
        this.registrations.push(
            { age: 20, name: 'Tom Tailor', salutation: 'Mr.' },
            { age: 19, name: 'Max Muster', salutation: 'Mr.' }
        );
    }

    public getAll() {
        return this.registrations;
    }

    public add(registraction: RegistrationInterface) {
        this.registrations.push(registraction);
    }
}

export default RegistrationDao;
