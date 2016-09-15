import UIControllerInterface from './UIControllerInterface';

abstract class UIControllerAbstract implements UIControllerInterface {
    constructor(public app: any) {
    }
}

export default UIControllerAbstract;
