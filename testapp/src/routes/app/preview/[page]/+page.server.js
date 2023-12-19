import { getDocuments } from "$lib/server/rest-client/paperless";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const documents = await getDocuments(params.page);
  return {
    documents,
  };
}
