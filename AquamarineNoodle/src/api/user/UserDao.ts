import DaoInterface from '../common/DaoInterface';
import UserInterface from '../user/UserInterface';
import UserModel from '../user/UserModel';
import ArrayHelper from '../helpers/ArrayHelper';

class UserDao implements DaoInterface {
    private users: Array<UserInterface> = new Array<UserInterface>(); 
    private arrayHelper: ArrayHelper;

    constructor(dependencies?: any) {
        this.arrayHelper = dependencies && dependencies.arrayHelper || new ArrayHelper();
        
        [
            new UserModel({ username: "john", password: "secret" }),
            new UserModel({ username: "user2", password: "password" }),
            new UserModel({ username: "something", password: "whatever" })
        ].forEach(users => this.users.push(users));
    }
    
    getAll() {
        const redactedUsers : Array<UserInterface> = new Array<UserInterface>(); 
        
        this.users.forEach(user => {
            redactedUsers.push(<UserInterface>{
                username: user.username,
                password: ''
            });
        });
        
        return redactedUsers;
    }
    
    isValid(possibleUser: UserInterface) {
        const matchingUser = this.arrayHelper.arrayQuery({
            array: this.users,
            queryField: 'username',
            targetValue: possibleUser.username,
            throwOnMatchless: false,
        });
        
        return matchingUser && matchingUser.password === possibleUser.password;
    }
}

export default UserDao;