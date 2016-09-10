import ModelInterface from '../common/ModelInterface';
import HttpStatusInterface from './HttpStatusInterface';

class HttpStatusModel implements ModelInterface, HttpStatusInterface {
    category: string;
    code: number;
    label: string;
    
    constructor (status: HttpStatusInterface) {
        this.category = status.category;
        this.code = status.code;
        this.label = status.label;
    }
}

export default HttpStatusModel;