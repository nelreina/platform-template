/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  // get json with photo galerie online
  const json = await fetch("https://jsonplaceholder.typicode.com/photos");
  const photos = await json.json();
  // return json
  return {
    photos,
  };
}
