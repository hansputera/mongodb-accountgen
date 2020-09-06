import Mongo from "./src/Mongo";
const mongo = new Mongo('Scraper Inc.'); // company name and password is optional.

(async () => {
 await mongo.generator(); // data will printed.
})();