import APIControllerInterface from './APIControllerInterface';

abstract class APIControllerAbstract implements APIControllerInterface {
    constructor(public app: any) {
        this.addEndpoints(app);
    }

    protected abstract addEndpoints(app: any): void;
}

export default APIControllerAbstract;
