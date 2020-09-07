import { ProxyOptions } from "./Interfaces";
import request from "request";
import { load } from "cheerio";

export default class ProxyHandle {
    constructor(public opt?: ProxyOptions) {
        if (!this.opt) {
            this.opt = {
                url: "https://www.sslproxies.org",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
                }
            }
        }
    }

    async generate(): Promise<string> {
    let tempData: string[] = [];
        let ops: string[];
        let out: string = "";
        request(this.opt as ProxyOptions, (error, response, data: Buffer | string) => {
            const $ = load(data);
            $("#proxylisttable td").each((_, el) => {
                tempData.push($(el).text().trim());
                ops = tempData.filter((x: string) => /[0-9]/g.exec(x) && !/[a-z]/g.exec(x));
            });
            const ip = ops.filter(x => x.length > 5);
            const port = ops.filter(x => x.length < 5);
            const num: number = Math.floor(Math.random() * port.length);

            out += `https://${ip[num]}:${port[num]}`;
            console.info("Using proxy: " + out);
        });
        return out;
    }
}