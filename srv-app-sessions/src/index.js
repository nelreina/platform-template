import "dotenv/config";

import { newEventStreamService as EventStream } from "@nelreina/redis-stream-consumer";

import { client } from "./config/redis-client.js";
import { pbAdmin } from "./config/pocketbase.js";
import logger from "./config/logger.js";
import { handler } from "./event-handler.js";
import { SERVICE } from "./config/constants.js";
import { document_handler } from "./paperless-handler.js";

const STREAM = process.env["STREAM"];
const POCKETBASE_ADMIN = process.env["POCKETBASE_ADMIN"];
const POCKETBASE_ADMIN_PASSWORD = process.env["POCKETBASE_ADMIN_PASSWORD"];

const shutdown = async () => {
  try {
    logger.info("Disconnecting from redis...");
    await client.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

try {
  if (!client.isOpen) await client.connect();
  if (client.isOpen) {
    logger.info("✅ Successfully connected to redis");
    if (
      POCKETBASE_ADMIN === undefined ||
      POCKETBASE_ADMIN_PASSWORD === undefined
    ) {
      // skip authentication
      logger.warn("Pocketbase admin credentials not provided.");
    } else {
      try {
        await pbAdmin.admins.authWithPassword(
          POCKETBASE_ADMIN,
          POCKETBASE_ADMIN_PASSWORD
        );
        logger.info(
          "✅ PocketBase admin authenticated for admin user: " +
            POCKETBASE_ADMIN
        );
        // schedule.scheduleJob(RESET_SCHEDULE, resetCalculations);
      } catch (error) {
        logger.error(
          "❗️ PocketBase admin authentication failed:  " + error.message
        );
      }
    }
    if (STREAM === undefined) {
      logger.error("STREAM environment variable not provided.");
      process.exit(1);
    } else {
      logger.info("✅ STREAM: " + STREAM);
      let msg = await EventStream(client, STREAM, SERVICE, false, handler);
      logger.info(msg);
      msg = await EventStream(
        client,
        "paperless-server:stream",
        SERVICE,
        false,
        document_handler,
        "0"
      );
      logger.info(msg);
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } else {
    logger.error("Could not connect to Redis client!");
  }
} catch (error) {
  logger.error(error.message);
}
