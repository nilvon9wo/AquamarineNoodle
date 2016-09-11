import ControllerAbstract from '../common/ControllerAbstract';

import RegistrationInterface from './RegistrationInterface';
import RegistrationModel from './RegistrationModel';
import RegistrationDao from './RegistrationDao';
import HttpStatusDao from '../httpStatusCodes/HttpStatusDao';

class RegistrationController extends ControllerAbstract {
    private registrationDao: RegistrationDao;
    private httpStatusDao: HttpStatusDao;

    constructor(app: any, registrationDao?: RegistrationDao, daos?: any) {
        super(app);
        this.addEndpoints();

        this.registrationDao = daos && daos.registrationDao || new RegistrationDao();
        this.httpStatusDao = daos && daos.httpStatusDao || new HttpStatusDao();
    }

    addEndpoints() {
        this.app.get('/api/registrations', (request: any, response: any) => {
            return response.send(this.registrationDao.getAll());
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