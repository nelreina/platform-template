<script>
  let emails = [
    { id: 1, sender: "John Doe", subject: "Meeting Tomorrow" },
    { id: 2, sender: "Jane Smith", subject: "Project Update" },
    // Add more emails as needed
  ];
</script>

<div class="container mx-auto p-4">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Sidebar (you can customize this section) -->
    <div class="md:col-span-1 bg-white p-4 rounded shadow">
      <p class="font-semibold text-lg mb-4">Folders</p>
      <ul>
        <li class="mb-2 text-blue-600 hover:text-blue-800 cursor-pointer">
          Inbox
        </li>
        <li class="mb-2 text-gray-600 hover:text-gray-800 cursor-pointer">
          Sent
        </li>
        <li class="mb-2 text-gray-600 hover:text-gray-800 cursor-pointer">
          Drafts
        </li>
        <!-- Add more folders as needed -->
      </ul>
    </div>

    <!-- Main Content Area -->
    <div class="md:col-span-2 bg-white p-4 rounded shadow">
      <!-- Email list header -->
      <div class="flex justify-between items-center mb-4">
        <p class="font-semibold text-lg">Inbox</p>
        <div class="flex space-x-2">
          <button class="text-gray-600 hover:text-gray-800">
            <!-- Previous button icon (customize as needed) -->
            &lt;
          </button>
          <button class="text-gray-600 hover:text-gray-800">
            <!-- Next button icon (customize as needed) -->
            &gt;
          </button>
        </div>
      </div>

      <!-- Email list -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each emails as { id, sender, subject }}
          <div class="email-item">
            <img
              src={`https://placekitten.com/50/50?image=${id}`}
              alt="Thumbnail"
              class="thumbnail"
            />
            <p class="font-semibold text-sm">{sender}</p>
            <p class="text-sm text-gray-600">{subject}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* Add your custom styles here */
  .email-item {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .thumbnail {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
</style>
