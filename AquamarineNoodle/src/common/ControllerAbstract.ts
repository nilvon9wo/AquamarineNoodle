import ControllerInterface from './ControllerInterface';

abstract class ControllerAbstract implements ControllerInterface {
    constructor(public app: any){
        this.addEndpoints(app);
    }
    
    protected abstract addEndpoints(app: any): void;
}

export default ControllerAbstract;
