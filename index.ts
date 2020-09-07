import mongoClient from "./src/Mongo";
const mongo = new mongoClient("Piring");
(async() => {
    await mongo.generator();
})();