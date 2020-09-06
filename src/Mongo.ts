import { launch } from "puppeteer";
import randomEmail from "random-email";
import randomDog from "dog-names";
import genPass from "generate-password";
import Util from "./Utils";
import MongoError from "./MongoError";
const util = new Util();

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
        const browser = await launch();
        const page = await browser.newPage();

        const email = randomEmail();
        const password = this.password;

        await page.goto(this.mongodb_register);
        await page.type('input[name="emailAddress"]', randomEmail());
        await page.type('input[name="firstName"]', randomDog.femaleRandom());
        await page.type('input[name="lastName"]', randomDog.maleRandom());
        await page.type('input[name="password"]', this.password as string);
        await page.type('input[name="phoneNumber"]', util.generateNumber(12).toString());
        await page.type('input[name="company"]', this.companyName ? this.companyName : 'Scraper Corps.');
        await page.select('select[name="jobResponsibility"]', 'Student');
        await page.select('select[name="country"]', 'ID');
        await page.click('input#checkbox-3470619');
        await page.click(`button."css-ntpyb3 leafygreen-ui-l67amq"`);

        await page.waitForNavigation();
        
        console.info(`+=+=+=+= MONGO DB ACCOUNT GENERATED =+=+=+=+=\nEmail: ${email}\nPassword: ${password}`);
        return true;
    }   
}