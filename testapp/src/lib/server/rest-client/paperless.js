import RestClient from "@nelreina/rest-client";
import "dotenv/config";
import logger from "$lib/server/logger.js";

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
