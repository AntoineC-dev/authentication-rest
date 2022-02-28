import mongoose from "mongoose";
import config from "config";
import { logger } from ".";

const dbUri = config.get<string>("dbUri");

async function connectToDb() {
  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to MongoDb");
  } catch (error) {
    logger.error(`MongoDb Error: ${error}`);
    process.exit(1);
  }
}

export default connectToDb;
