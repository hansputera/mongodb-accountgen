export default class MongoDB {
    readonly companyName?: string | undefined;
    readonly password?: string | undefined;
    readonly mongodb_register = "https://account.mongodb.com/account/register";
    constructor(companyName?: string | undefined, password?: string | undefined);
    generator(): Promise<boolean>;
}
