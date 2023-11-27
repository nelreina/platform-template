import logger from "./config/logger.js";
import { pbAdmin } from "./config/pocketbase.js";
import { getBrowserName, getDeviceType, getOsName } from "./lib/utils.js";
import ip3country from "ip3country";

ip3country.init();

export const handler = async (stream) => {
  const { streamId, aggregateId, event, payload } = stream;
  const browserSessionToken = aggregateId;
  const data = {
    event,
    browserSessionToken,
    payload,
  };

  if (payload.userAgent) {
    const { userAgent } = payload;
    data.browser = getBrowserName(userAgent);
    data.os = getOsName(userAgent);
    data.device = getDeviceType(userAgent);
  }
  if (payload.ip) {
    data.ip_address = payload.ip;
    try {
      const countryCode = await ip3country.lookupStr(payload.ip);
      data.countryCode = countryCode;
    } catch (error) {
      logger.error(`Unable to get country code for ip: ${payload.ip}`);
    }
  }

  if (payload.appUserId) {
    const { appUserId } = payload;
    const user = await pbAdmin.collection("users").getOne(appUserId);
    data.username = user.username;
  }

  await pbAdmin.collection("app_sessions").create(data);

  logger.info(JSON.stringify({ event, aggregateId, payload }));
  stream.ack(streamId);
};
