import { fuzzySearch } from "./utils.js";
import { client as redis } from "../config/redis-client.js";

const REDIS_KEY_CACHED_MEMBERS =
  process.env["REDIS_KEY_CACHED_MEMBERS"] || "lcm:cache:all:members";

function extractLCM(inputString) {
  const match = inputString.toLowerCase().match(/l.m.(\d+)/);
  return match ? match[0] : null;
}

const findLcmRef = (contentArray) => {
  const res = contentArray.filter(
    (item) =>
      item.toLowerCase().includes("lcm") ||
      item.toLowerCase().includes("lom") ||
      item.toLowerCase().includes("lem")
  );
  if (!res.length) return null;
  return extractLCM(res[0]);
};

export const matchMember = async (content) => {
  let member;
  let matchResult = "NO_MATCH";
  const allMember = await redis.get(REDIS_KEY_CACHED_MEMBERS);
  const members = JSON.parse(allMember);
  const textLcmRef = findLcmRef(content.split("\n"));
  if (!textLcmRef) return { member, matchResult };
  const result = fuzzySearch(members, "lcmRef", textLcmRef);

  // If result score is less than 0.1, then we can assume that we have a match
  const match = result.find((item) => item.score < 0.1);
  if (match) {
    member = match.item;
    matchResult = "MATCH";
  } else {
    member = result;
    matchResult = "PARTIAL";
  }
  return { member, matchResult };
};
