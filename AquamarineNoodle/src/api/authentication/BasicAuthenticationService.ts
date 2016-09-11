/// <reference path='../../../declarations/basic-auth/basic-auth.d.ts' />

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
            var auth = require('basic-auth');
            const basicUser = auth(request);
            
            if (!basicUser || !basicUser.name || !basicUser.pass || this.isValid(basicUser)) {
                const status = this.httpStatusDao.get('UNAUTHORIZED');
                response.statusCode = status.code;
                response.setHeader('WWW-Authentcate', 'Basic realm="Aquamarine-Noodle"');
                response.end(status.label);
            } else {
                next();
            }
        });
    }
    
    isValid(basicUser: any){
        const user = new UserModel(<UserInterface>{
            username: basicUser.name,
            password: basicUser.password
        });
        
        const result = this.userDao.isValid(user);
        return result;
    }
}

export default BasicAuthenticationService;