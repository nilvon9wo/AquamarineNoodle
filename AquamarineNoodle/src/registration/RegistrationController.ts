import ControllerAbstract from '../common/ControllerAbstract';

import RegistrationInterface from '../registration/RegistrationInterface';
import RegistrationModel from '../registration/RegistrationModel';
import RegistrationDao from './RegistrationDao';
import HttpStatusDao from '../httpStatusCodes/HttpStatusDao';

class RegistrationController extends ControllerAbstract {
    private registrationDao: RegistrationDao;
    private httpStatusDao: HttpStatusDao;

    constructor(app: any, registrationDao?: RegistrationDao, daos?: any) {
        super(app);
        this.addEndpoints();

        if (daos) {
            this.registrationDao = daos.registrationDao || new RegistrationDao();
            this.httpStatusDao = daos.httpStatusDao || new HttpStatusDao();
        }

    }

    addEndpoints() {
        this.app.get('/api/registrations', (request: any, response: any) => {
            return this.registrationDao.getAll();
        });

        this.app.post('/api/register', (request: any, response: any) => {
            var registration = new RegistrationModel(<RegistrationInterface>request.body);
            if (registration.isValid()) {
                this.registrationDao.add(registration);
                response.send(this.httpStatusDao.get('CREATED').code);
            } else {
                response.send(this.httpStatusDao.get('BAD_REQUEST').code);
            }
        });
    }
}

export default RegistrationController;