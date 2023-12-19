<script>
  export let data;

  const getPageNumber = (url) => {
    if (!url) return -1;
    const urlParams = new URLSearchParams(url);
    const page = urlParams.get("page");
    return page ? urlParams.get("page") : 1;
  };

  const documents = data?.documents.results || [];
  const next = getPageNumber(data?.documents.next);
  const previous = getPageNumber(data?.documents.previous);
  const count = data?.documents.count;
</script>

<div>
  <header class="flex justify-between align-middle items-center">
    {#if previous === -1}
      <button disabled class="btn disabled">Previous</button>
    {:else}
      <a href="/app/preview/{previous}" data-sveltekit-reload class="btn"
        >Previous
      </a>
      <!-- else content here -->
    {/if}
    <div class="text-3xl uppercase mb-5">
      Documents ( {documents.length} of {count} )
    </div>
    {#if next === -1}
      <!-- content here -->
      <button disabled class="btn disabled">Next</button>
    {:else}
      <!-- else content here -->
      <a href="/app/preview/{next}" class="btn" data-sveltekit-reload>Next</a>
    {/if}
  </header>

  <!-- {thumb} -->
  <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
    {#each documents as document (document.id)}
      {@const lcm = document.content.includes("LCM")}
      <div
        class:variant-filled-tertiary={lcm}
        class:variant-ghost-surface={!lcm}
        class="card varte rounded-xl p-3"
      >
        <h1 class="text-2xl text-center">
          {document.id} | {document.title}
        </h1>
        <div class="grid grid-cols-2">
          <img
            src="/api/thumb/{document.id}"
            alt={document.title}
            class="h-64 rounded-lg"
          />
          <p>{document.content}</p>
        </div>
      </div>
      <!-- content here -->
    {/each}
  </div>
</div>
