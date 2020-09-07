import { ProxyOptions } from "./Interfaces";
export default class ProxyHandle {
    opt?: ProxyOptions | undefined;
    constructor(opt?: ProxyOptions | undefined);
    generate(): Promise<string>;
}
