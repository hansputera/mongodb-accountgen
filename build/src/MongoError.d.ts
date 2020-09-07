export default class MongoError extends Error {
    name: string;
    constructor(name: string, message?: string);
}
