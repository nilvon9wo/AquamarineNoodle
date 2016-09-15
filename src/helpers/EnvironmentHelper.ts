class EnvironmentHelper {
    private env: any;

    constructor(env: any) {
        this.env = env;
    }



    public evalBoolean(name: string, fallback: boolean) {
        return this.env[name] && this.env[name] !== 'false' || fallback;
    }
}

export default EnvironmentHelper;
