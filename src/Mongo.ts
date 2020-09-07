import { launch } from "puppeteer";
import randomEmail from "random-email";
import randomDog from "dog-names";
import genPass from "generate-password";
import Util from "./Utils";
const util = new Util();
import useProxy from "puppeteer-page-proxy";
import Proxyhandler from "./ProxyHandle";
const prox = new Proxyhandler();

export default class MongoDB {
    readonly mongodb_register = "https://account.mongodb.com/account/register";
    constructor(readonly companyName?: string, readonly password?: string) {
        if (this.password) {
            this.password = this.password;
        } else {
            this.password = genPass.generate({ length: 10, numbers: true });
        }
    }

    async generator(): Promise<boolean> {
        const proxy = await prox.generate();
        const browser = await launch();
        const page = await browser.newPage();

        const email = randomEmail();
        const password = this.password;

        await page.setRequestInterception(true);
        page.on("request", async request => {
            await useProxy(request, proxy);
        });
        await page.goto(this.mongodb_register);
        await page.type('input[name="emailAddress"]', email);
        await page.type('input[name="firstName"]', randomDog.femaleRandom());
        await page.type('input[name="lastName"]', randomDog.maleRandom());
        await page.type('input[name="password"]', this.password as string);
        await page.type('input[name="phoneNumber"]', util.generateNumber(12).toString());
        await page.type('input[name="company"]', this.companyName ? this.companyName : 'Scraper Corps.');
        await page.select('select[name="jobResponsibility"]', 'Student');
        await page.select('select[name="country"]', 'ID');
        await page.$$eval('input[type="checkbox"]', checkboxes => {
            checkboxes.forEach(ch => (ch as any).parentElement.click());
        });
        await page.evaluate(() => (document.querySelectorAll("[class=\"css-ntpyb3 leafygreen-ui-xuxy0d\"]")[0] as any).click());
        await page.waitForNavigation();
        await page.close();
        await browser.close();
        console.info(`+=+=+=+= MONGO DB ACCOUNT GENERATED =+=+=+=+=\nEmail: ${email}\nPassword: ${password}`);
        return true;
    }   
}