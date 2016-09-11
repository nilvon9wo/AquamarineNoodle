import ModelInterface from '../common/ModelInterface';
import HttpStatusInterface from './HttpStatusInterface';

class HttpStatusModel implements ModelInterface, HttpStatusInterface {
    public category: string;
    public code: number;
    public label: string;

    constructor (status: HttpStatusInterface) {
        this.category = status.category;
        this.code = status.code;
        this.label = status.label;
    }
}

export default HttpStatusModel;
