import {  Db, MongoClient } from "mongodb";

const URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
const client = new MongoClient(URL);

export class BaseMongoModel
{
    private client : MongoClient;
    public database : Db;
    constructor()
    {
        this.client = client;
        this.database = this.client.db(process.env.MONGODB_NAME || "test"); 

        this.onInit();
    }

    /**
     * This method is called when the model is initialized
     */
    onInit() {

    }

    async testConnection() {
        try{
            await this.client.connect();
            console.log("Connected to MongoDB");
        }
        catch(error)
        {
            console.error("Error connecting to MongoDB", error);
        }
    }
}