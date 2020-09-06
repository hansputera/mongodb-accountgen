export default class MongoError extends Error {
    constructor(public name: string, message?: string) {
        super(message);
    }
}