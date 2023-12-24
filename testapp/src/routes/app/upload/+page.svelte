<script>
  export let form;
  import { enhance } from "$app/forms";
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";

  let preview;
  let extension;
  let document_type;

  const showUploadPreview = (e) => {
    const file = e.target.files[0];
    extension = file.name.split(".").pop();

    if (file) {
      preview = URL.createObjectURL(file);
    }
  };
</script>

<div class="card p-10 space-y-3">
  <h1 class="text-2xl font-bold">Test Upload to Paperless</h1>
  <p class="text-gray-500">Upload a file to the server</p>
  {#if form?.error}
    <div class="alert alert-error">{form.error}</div>
  {/if}
  <form
    action=""
    class="grid gap-3 md:grid-cols-2"
    method="post"
    enctype="multipart/form-data"
    use:enhance
  >
    <div class="form space-y-5">
      {#if form?.success}
        <div class="alert variant-glass-success">{form.success}</div>
      {/if}
      <!-- Upload only image or pdf -->
      <div class="input-group">
        <label for="document" class="label">Upload only image or pdf</label>
        <input
          id="document"
          class="input"
          type="file"
          name="document"
          on:change={showUploadPreview}
          required
          accept="image/*,application/pdf"
        />
      </div>
      <input
        type="text"
        class="input"
        name="trackingNumber"
        placeholder="Tracking #"
        required
      />
      <input
        type="number"
        class="input"
        name="weight"
        placeholder="Weight"
        step="0.1"
      />
      <div class="div">
        <input type="hidden" name="document_type" bind:value={document_type} />
        <RadioGroup>
          <RadioItem bind:group={document_type} name="justify" value={1}
            >Package</RadioItem
          >
          <RadioItem bind:group={document_type} name="justify" value={2}
            >Invoice</RadioItem
          >
        </RadioGroup>
      </div>
      <input
        class="btn variant-filled-primary"
        type="submit"
        value="Upload"
        name="submit"
      />
    </div>
    <div class="image">
      {#if !extension}
        <p>Please choose a file!</p>
      {:else if extension === "pdf"}
        <p>PDF Preview Unavailable</p>
      {:else}
        <img src={preview} alt="upload" />
      {/if}
    </div>
  </form>
</div>
