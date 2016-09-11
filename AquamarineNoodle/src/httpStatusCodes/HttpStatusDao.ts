import DaoInterface from '../common/DaoInterface';
import HttpStatusModel from './HttpStatusModel';

class HttpStatusDao implements DaoInterface {

    private statuses: Array<HttpStatusModel> = new Array<HttpStatusModel>();

    constructor() {
        this.statuses.push(
            new HttpStatusModel({ category: 'Success', label: 'Ok', code: 200 }),
            new HttpStatusModel({ category: 'Success', label: 'Created', code: 201 }),
            new HttpStatusModel({ category: 'Client Error', label: 'Bad Request', code: 400 })
        );
    }

    getAll() {
        return this.statuses;
    }

    get(label: string): HttpStatusModel {
        const query = label.replace('_', ' ').toUpperCase();

        const BreakException = {};
        let result: HttpStatusModel;
        
        try {
            this.statuses.forEach(status => {
                if (status.label.toUpperCase() === query) {
                    result = status;
                    throw BreakException
                }
            });
        } catch (e) {
            if (e !== BreakException) {
                throw e;
            }
            
            return result
        }

        throw new Error('Invalid label: ' + label);
    }
}

export default HttpStatusDao;

