/// <reference path='../../../declarations/basic-auth/basic-auth.d.ts' />

import ModelInterface from '../common/ModelInterface';
import UserInterface from './UserInterface';

class UserModel implements ModelInterface, UserInterface {
    public username: string;
    public password: string;
    
    constructor (user: UserInterface) {
        this.username = user.username;
        this.password = user.password;
    }
}

export default UserModel;