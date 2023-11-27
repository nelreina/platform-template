import logger from "./config/logger.js";
import { pbAdmin } from "./config/pocketbase.js";

export const handler = async (stream) => {
  const { streamId, aggregateId, event, payload } = stream;
  const browserSessionToken = aggregateId;

  await pbAdmin.collection("app_sessions").create({
    browserSessionToken,
    event,
    payload,
  });

  logger.info(JSON.stringify({ event, aggregateId, payload }));
  stream.ack(streamId);
};
