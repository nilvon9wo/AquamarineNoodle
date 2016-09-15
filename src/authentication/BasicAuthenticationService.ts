/// <reference path='../../declarations/basic-auth/basic-auth.d.ts' />

import HttpStatusDao from '../httpStatus/HttpStatusDao';
import UserDao from '../user/UserDao';
import UserInterface from '../user/UserInterface';
import UserModel from '../user/UserModel';

class BasicAuthenticationService {
    private userDao: UserDao;
    private httpStatusDao: HttpStatusDao;

    constructor(app: any, dependencies?: any) {
        this.userDao = dependencies && dependencies.registrationDao || new UserDao();
        this.httpStatusDao = dependencies && dependencies.httpStatusDao || new HttpStatusDao();

        app.use((request: any, response: any, next: any) => {
            const user = this.getUser(request);

            if (!user || !this.userDao.isValid(user)) {
                const status = this.httpStatusDao.get('UNAUTHORIZED');
                response.statusCode = status.code;
                response.setHeader('WWW-Authentcate', 'Basic realm="Aquamarine-Noodle"');
                response.end(status.label);
            } else {
                next();
            }
        });
    }

    private getUser(request: any) {
        const auth = require('basic-auth');
        const user = new auth(request);
        return user && user.name && user.pass && new UserModel(<UserInterface>{
            password: user.pass,
            username: user.name
        });
    }
}

export default BasicAuthenticationService;
