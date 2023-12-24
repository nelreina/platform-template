import logger from "./config/logger.js";
import { matchMember } from "./lib/match.js";
import { pbAdmin } from "./config/pocketbase.js";
import { client as redis } from "./config/redis-client.js";

export const document_handler = async (stream) => {
  const { streamId, aggregateId, event, payload } = stream;
  logger.info(JSON.stringify({ event, aggregateId }));
  let additionalData = {};
  const additionalDataKey = `testapp:${aggregateId}`;
  const data = {
    type: payload.type,
    reference: aggregateId,
    ocr_content: payload.content,
    paperlessId: payload.documentId,
    tags: payload.tags,
  };

  if (payload.tags.includes("LCMREF")) {
    const match = await matchMember(payload.content);
    data["matchResult"] = match.matchResult;
    data["member"] = match.member;
  } else {
    data["matchResult"] = "NO_MATCH";
  }

  // Get additional data from Redis
  const redisData = await redis.get(additionalDataKey);
  if (redisData) additionalData = JSON.parse(redisData);
  const newData = { ...additionalData, ...data };
  try {
    const record = await pbAdmin.collection("documents_inbox").create(newData);
    logger.info(JSON.stringify(record));
    // Delete additional data from Redis
    await redis.del(additionalDataKey);
    stream.ack(streamId);
  } catch (error) {
    logger.error(error.message);
  }
};
