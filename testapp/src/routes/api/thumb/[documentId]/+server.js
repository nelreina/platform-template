/** @type {import('./$types').RequestHandler} */

import "dotenv/config";

const PAPERLESS_API = process.env["PAPERLESS_API"];
const PAPERLESS_API_KEY = process.env["PAPERLESS_API_KEY"];
export async function GET({ params, fetch }) {
  const url = `/api/documents/${params.documentId}/thumb/`;

  // fetch with headers
  const res = await fetch(`${PAPERLESS_API}${url}`, {
    headers: {
      Accept: "*/*",
      Authorization: `Token ${PAPERLESS_API_KEY}`,
    },
  });

  // fetch without headers
  // const res = await fetch(`https://api.github.com/users/${params.username}`);
  const blob = await res.blob();
  return new Response(blob, {
    headers: {
      "Cache-Control": "public, max-age=604800",
      "Content-Type": "image/png",
    },
  });
}
