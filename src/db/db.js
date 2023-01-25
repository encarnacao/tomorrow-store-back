import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
let client = null;
let db = null;

export async function connectDatabase() {
	try {
		client = new MongoClient(process.env.DATABASE_URL);
		await client.connect();
		db = client.db();
		console.log("Database connected");
	} catch (e) {
		console.log(e);
		console.log("Database connection failed");
	}
}

export function getDatabase() {
	if (!db) {
		throw new Error("Database not connected");
	} else {
		return db;
	}
}
