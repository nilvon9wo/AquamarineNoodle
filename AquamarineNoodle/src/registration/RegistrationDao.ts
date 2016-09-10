import DaoInterface from '../common/DaoInterface';
import RegistrationInterface from '../registration/RegistrationInterface';

class RegistrationDao implements DaoInterface {
    private registrations: Array<RegistrationInterface> = new Array<RegistrationInterface>(); 

    constructor() {
        this.registrations.push(
            { salutation: "Mr.", name: "Tom Tailor", age: 20 },
            { salutation: "Mr.", name: "Max Muster", age: 19 }
        );
    }
    
    getAll() {
        console.log('$$$$ RETURN this.registrations', this.registrations);
        return this.registrations;
    }
    
    add(registraction: RegistrationInterface){
        this.registrations.push(registraction);
    }
}

export default RegistrationDao;