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
            new UserModel({ password: 'secret', username: 'john' }),
            new UserModel({ password: 'password', username: 'user2' }),
            new UserModel({ password: 'whatever', username: 'something' })
        ].forEach(users => this.users.push(users));
    }

    public getAll() {
        const redactedUsers: Array<UserInterface> = new Array<UserInterface>();

        this.users.forEach(user => {
            redactedUsers.push(<UserInterface>{
                password: '',
                username: user.username
            });
        });

        return redactedUsers;
    }

    public isValid(possibleUser: UserInterface) {
        const matchingUser = this.arrayHelper.arrayQuery({
            array: this.users,
            queryField: 'username',
            targetValue: possibleUser.username,
            throwOnMatchless: false
        });

        return matchingUser && matchingUser.password === possibleUser.password;
    }
}

export default UserDao;
