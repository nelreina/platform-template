<script>
  /** @type {import('./$types').PageData} */
  export let data;
  const photos = data.photos;
</script>

<h3>Galerie</h3>

<div class="my-grid">
  {#each photos as photo}
    <a href={photo.url}>
      <article>
        <img src={photo.thumbnailUrl} alt={photo.title} />
        <h6>{photo.title}</h6>
      </article>
    </a>
  {/each}
</div>

<style>
  .my-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1rem;
  }

  .my-grid article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    /* border: 1px solid #ccc; */
    border-radius: 4px;
  }

  .my-grid article img {
    width: 100%;
    height: auto;
    /* border-radius: 4px; */
  }
</style>
