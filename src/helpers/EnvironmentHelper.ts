class EnvironmentHelper {
    private env: any;

    constructor(env: any) {
        this.env = env;
    }

    public conditionalDo(config: any) {
        if (!config.propertyName || !config.func) {
            throw new Error ('conditionalDo is missing required proeprties.');
        }
        const propertyName = config.propertyName;
        const doIf = (config.doIf !== undefined) ?  config.doIf : true;
        const defaultTo = (config.defaultTo !== undefined) ? config.defaultTo : false;

        const value = this.evalBoolean (propertyName, defaultTo);

        if (doIf === value) {
            config.func();
        }
    }

    private evalBoolean(name: string, fallback: boolean) {
        return this.env[name] && this.env[name] !== 'false' || fallback;
    }
}

export default EnvironmentHelper;
