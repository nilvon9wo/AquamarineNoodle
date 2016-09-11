import ControllerAbstract from '../common/ControllerAbstract';

import RegistrationInterface from './RegistrationInterface';
import RegistrationModel from './RegistrationModel';
import RegistrationDao from './RegistrationDao';
import HttpStatusDao from '../httpStatus/HttpStatusDao';

class RegistrationController extends ControllerAbstract {
    private registrationDao: RegistrationDao;
    private httpStatusDao: HttpStatusDao;

    constructor(app: any, dependencies?: any) {
        super(app);
        this.addEndpoints();

        this.registrationDao = dependencies && dependencies.registrationDao || new RegistrationDao();
        this.httpStatusDao = dependencies && dependencies.httpStatusDao || new HttpStatusDao();
    }

    addEndpoints() {
        this.app.get('/api/registrations', (request: any, response: any) => {
            return response.send(this.registrationDao.getAll());
        });

        this.app.post('/api/register', (request: any, response: any) => {
            var registration = new RegistrationModel(<RegistrationInterface>request.body);
            if (registration.isValid()) {
                this.registrationDao.add(registration);
                response.sendStatus(this.httpStatusDao.get('CREATED').code);
            } else {
                response.sendStatus(this.httpStatusDao.get('BAD_REQUEST').code);
            }
        });
    }
}

export default RegistrationController;