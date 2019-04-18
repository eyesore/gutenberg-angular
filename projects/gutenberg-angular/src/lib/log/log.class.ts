export class LogCache {
    private _value: any[] = [];
    push(value): void {
        this._value.push(value);
    }
    indexOf(value): number {
        return this._value.indexOf(value);
    }
}
// @dynamic
export class log {
    static hideInDev = false;
    // static show = !log.hideInDev && !environment.production;
    static show = !log.hideInDev;
    static Debug = log.show ? console.log : (): void => {};
    static Error = log.show ? console.error : (): void => {};
    static Assert = log.show ? console.assert : (): void => {};

    // static Panic = (...val: any[]): void => {
    //     if (log.show) {
    //         throw val;
    //     }
    // }
    static InTemplate = (val: any): any => {
        let cache = new LogCache();
        const stripedVal = JSON.parse(JSON.stringify(val, log.replacerFn(cache)));
        cache = null;
        return stripedVal;
    }

    static replacerFn(cache: LogCache) {

        return (_, value) => {
            if (typeof value === 'object') {
                if (cache.indexOf(value) === -1) {
                    cache.push(value);
                    return value;
                }
                return null;
            }
            return value;
        };
    }
}
