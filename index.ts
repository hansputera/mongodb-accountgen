import mongoClient from "./src/Mongo";
const mongo = new mongoClient("Piring");

async function gabut() {
    await mongo.generator();
}

gabut();