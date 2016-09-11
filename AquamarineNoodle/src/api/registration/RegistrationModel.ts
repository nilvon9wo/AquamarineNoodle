import ModelInterface from '../common/ModelInterface';
import RegistrationInterface from './RegistrationInterface';

class RegistrationModel implements ModelInterface, RegistrationInterface {
    public salutation: string;
    public name: string;
    public age: number;
    
    constructor (registration: RegistrationInterface) {
        this.salutation = registration.salutation;
        this.name = registration.name;
        this.age = registration.age;
    }
    
    public isValid() {
        return this.age >= 18;
    }
}

export default RegistrationModel;