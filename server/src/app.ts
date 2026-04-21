import "dotenv/config";
import express, { type Express } from "express";
import connectToDatabase from "./db/config/connection.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

async function server() {
  try {
    await connectToDatabase()
      .then(() => {
        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      })
      .catch((error) => {
        console.error("Error connecting to database:", error);
        process.exit(1);
      });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

server();
