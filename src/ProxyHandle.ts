import { ProxyOptions } from "./Interfaces";
import request from "request";
import { load } from "cheerio";
import MongoError from "./MongoError";

const urls: string[] = ["https://free-proxy-list.net/anonymous-proxy.html", "https://www.sslproxies.org", "https://free-proxy-list.net", "https://www.us-proxy.org"];



export default class ProxyHandle {
    constructor(public opt?: ProxyOptions) {
        if (!this.opt) {
            const random: number = Math.floor(Math.random() * urls.length);
            this.opt = {
                url: urls[random],
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

           
            request({ url: "https://google.com", proxy: out, headers: { "User-Agent": this.opt?.headers?.["User-Agent"] }}, (err, res) => {
                    console.info("[PROXY-ROTATOR] DO CHECKING PROXY!");
                if (err) {
                    throw new MongoError("Proxy Broken, Try Again!" + err);
                } else if (res.statusCode != 200) {
                    throw new MongoError("Proxy Broken, Code " + res.statusCode);
                } else if (!res.body) {
                    throw new MongoError("Proxy Broken, Can't find body!");
                } else {
                    out += `https://${ip[num]}:${port[num].length < 3 ? port[num] + '80' : port[num]}`;
                    console.info("Using proxy: " + out);
                }
            });
        });
        return out;
    }
}
