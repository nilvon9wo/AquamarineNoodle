class ArrayHelper {
    private breakOnFind = {result: <any>null};

    public arrayQuery(queryConfig: any) {
        if (!queryConfig || !queryConfig.array || !queryConfig.queryField) {
            throw new Error ('arrayQuery queryConfig is missing required values.');
        }

        try {
            this.findMatch(queryConfig);
        } catch (e) {
            if (e !== this.breakOnFind) {
                throw e;
            }
            return this.breakOnFind.result;
        }

        if (queryConfig.throwOnMatchless) {
            throw new Error('Invalid target: ' + queryConfig.targetValue);
        } else {
            return null;
        }
    }

    private findMatch(queryConfig: any) {
        const haystack = queryConfig.array;
        const queryField = queryConfig.queryField;
        const needle = (queryConfig.targetTransform)
            ? queryConfig.targetTransform(queryConfig.targetValue)
            : queryConfig.targetValue;

        let result: any;
        haystack.forEach((item: any) => {
            const possibleMatch: any = (queryConfig.matchTransform)
                ? queryConfig.matchTransform(item[queryField])
                : item[queryField];

            if (possibleMatch === needle) {
                this.breakOnFind.result = item;
                throw this.breakOnFind;
            }
        });
        return result;
    }
}

export default ArrayHelper;
