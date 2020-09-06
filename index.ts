import Mongo from "./src/Mongo";
const mongo = new Mongo('COMPANY NAME', 'PASSWORD'); // company name and password is optional.

(async () => {
 await mongo.generator(); // data will printed.
});