import RestClient from "@nelreina/rest-client";
import "dotenv/config";
import logger from "$lib/server/logger.js";
import { client as redis } from "$lib/server/redis-client.js";
import { v4 as uuidv4 } from "uuid";

const PAPERLESS_API = process.env["PAPERLESS_API"];
const PAPERLESS_API_KEY = process.env["PAPERLESS_API_KEY"];

const SERVICE_NAME = process.env["SERVICE_NAME"];
const paperlessApi = new RestClient(PAPERLESS_API, {
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: `Token ${PAPERLESS_API_KEY}`,
  },
});

export const getDocuments = async (page) => {
  const url = `/api/documents/?format=json&page=${page}`;
  console.log("LOG:  ~ file: paperless.js:14 ~ getDocuments ~ url:", url);
  try {
    const response = await paperlessApi.get(url);

    return response;
  } catch (error) {
    logger.error(error);

    return [];
  }
};

export const getThumbnail = async (documentId) => {
  const url = `/api/documents/${documentId}/thumb/`;
  console.log("LOG:  ~ file: paperless.js:26 ~ getThumbnail ~ url:", url);
  try {
    const response = await paperlessApi.get(url);

    return response;
  } catch (error) {
    logger.error(error);

    return "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg";
  }
};

export async function uploadDocument(formData, fetch, additionalFields = []) {
  const original = formData.get("document");

  const id = uuidv4();
  // reference is the first 8 characters of the UUID
  const reference = id.split("-")[0].toUpperCase();
  formData.set("document", original, `${reference}.pdf`);
  formData.set("title", reference);

  const redisData = {};
  additionalFields.forEach((field) => {
    const value = formData.get(field);
    if (value) {
      redisData[field] = value;
    }
  });

  const redisKey = `${SERVICE_NAME}:${reference}`;

  const url = "/api/documents/post_document/";
  // console.log("LOG:  ~ file: paperless.js:41 ~ uploadDocument ~ url:", url);
  try {
    const res = await fetch(`${PAPERLESS_API}${url}`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
        Authorization: `Token ${PAPERLESS_API_KEY}`,
      },
    });
    const taskId = await res.json();
    redisData["taskId"] = taskId;
    const redisValue = JSON.stringify(redisData);
    await redis.set(redisKey, redisValue);
    return reference;
  } catch (error) {
    logger.error(error);
    return null;
  }
}
