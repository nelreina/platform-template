import { pbAdmin } from "$lib/server/pb-admin";
import { serializePOJO } from "$lib/utils";

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
  let sessions = [];
  try {
    const records = await pbAdmin.collection("app_sessions").getList(1, 50, {
      sort: "-created",
    });
    sessions = serializePOJO(records.items);
  } catch (error) { }

  return {
    user: locals.user,
    sessions,
  };
}

