import DaoInterface from '../common/DaoInterface';
import HttpStatusModel from './HttpStatusModel';
import ArrayHelper from '../helpers/ArrayHelper';

class HttpStatusDao implements DaoInterface {
    private statuses: Array<HttpStatusModel> = new Array<HttpStatusModel>();
    private arrayHelper: ArrayHelper;

    constructor(dependencies?: any) {
        this.arrayHelper = dependencies && dependencies.arrayHelper || new ArrayHelper();

        [
            new HttpStatusModel({ category: 'Success', code: 200, label: 'Ok'}),
            new HttpStatusModel({ category: 'Success', code: 201, label: 'Created' }),
            new HttpStatusModel({ category: 'Client Error', code: 400, label: 'Bad Request' }),
            new HttpStatusModel({ category: 'Client Error', code: 401, label: 'Unauthorized' })
        ].forEach(status => this.statuses.push(status));
    }

    public getAll() {
        return this.statuses;
    }

    public get(label: string): HttpStatusModel {
        return this.arrayHelper.arrayQuery({
            array: this.statuses,
            matchTransform: function (possibleMatch: string) {
                return possibleMatch.toUpperCase();
            },
            queryField: 'label',
            targetValue: label.replace('_', ' ').toUpperCase(),
            throwOnMatchless: true
        });
    }
}

export default HttpStatusDao;
