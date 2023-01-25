import express from "express";
import cors from "cors";
import { connectDatabase } from "./db/db.js";

const PORT = 5000;
const app = express();
app.use(cors());
await connectDatabase();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
