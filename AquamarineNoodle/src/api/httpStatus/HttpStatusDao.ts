import DaoInterface from '../common/DaoInterface';
import HttpStatusModel from './HttpStatusModel';
import ArrayHelper from '../helpers/ArrayHelper';

class HttpStatusDao implements DaoInterface {
    private statuses: Array<HttpStatusModel> = new Array<HttpStatusModel>();
    private arrayHelper: ArrayHelper;

    constructor(dependencies?: any) {
        this.arrayHelper = dependencies && dependencies.arrayHelper || new ArrayHelper();

        [
            new HttpStatusModel({ category: 'Success', label: 'Ok', code: 200 }),
            new HttpStatusModel({ category: 'Success', label: 'Created', code: 201 }),
            new HttpStatusModel({ category: 'Client Error', label: 'Bad Request', code: 400 }),
            new HttpStatusModel({ category: 'Client Error', label: 'Unauthorized', code: 401 })
        ].forEach(status => this.statuses.push(status))
    }

    getAll() {
        return this.statuses;
    }

    get(label: string): HttpStatusModel {
        return this.arrayHelper.arrayQuery({
            array: this.statuses,
            queryField: 'label',
            targetValue: label.replace('_', ' ').toUpperCase(),
            throwOnMatchless: true,
            matchTransform: function (possibleMatch:string){
                return possibleMatch.toUpperCase();
            }
        });
    }
}

export default HttpStatusDao;