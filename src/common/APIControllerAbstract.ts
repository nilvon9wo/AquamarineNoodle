import APIControllerInterface from './APIControllerInterface';

abstract class APIControllerAbstract implements APIControllerInterface {
    constructor(public app: Express.Application) {
        this.addEndpoints(app);
    }

    protected abstract addEndpoints(app: Express.Application): void;
}

export default APIControllerAbstract;
