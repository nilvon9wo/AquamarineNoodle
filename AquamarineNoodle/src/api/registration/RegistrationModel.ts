import ModelInterface from '../common/ModelInterface';
import RegistrationInterface from './RegistrationInterface';

const MIN_AGE = 18;

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
        let isOldEnough = this.age > MIN_AGE;
        if (!isOldEnough) {
            console.warn(`UNDER AGE: ${this.name} is only ${this.age}. ${MIN_AGE} is required.`);
        }
        return isOldEnough;
    }
}

export default RegistrationModel;