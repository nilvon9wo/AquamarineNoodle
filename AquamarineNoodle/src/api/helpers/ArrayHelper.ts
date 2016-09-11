class ArrayHelper {
    private BreakOnFind = {result: <any>null};

    arrayQuery(queryConfig: any) {
        if (!queryConfig || !queryConfig.array || !queryConfig.queryField) {
            throw new Error ('arrayQuery queryConfig is missing required values.');
        }

        try {
            this.findMatch(queryConfig);
        } catch (e) {
            if (e !== this.BreakOnFind) {
                throw e;
            }
            return this.BreakOnFind.result;
        }

        if (queryConfig.throwOnMatchless) {
            throw new Error('Invalid target: ' + queryConfig.targetValue);
        } else {
            return null;
        }
    }
    
    private findMatch(queryConfig: any){
        const haystack = queryConfig.array;
        const queryField = queryConfig.queryField;
        const needle = (queryConfig.targetTransform) 
            ? queryConfig.targetTransform(queryConfig.targetValue) 
            : queryConfig.targetValue;

        let result: any;
        haystack.forEach((item:any) => {
            const possibleMatch: any = (queryConfig.matchTransform) 
                ? queryConfig.matchTransform(item[queryField]) 
                : item[queryField];

            if (possibleMatch === needle) {
                this.BreakOnFind.result = item;
                throw this.BreakOnFind
            }
        });
        return result;
    }
}

export default ArrayHelper;