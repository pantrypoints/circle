<script lang="ts">
  export let data;

  const users = data.result ?? [];
  const total = users.length;
</script>

<div class="p-6 space-y-6 max-w-3xl mx-auto">
  
  <!-- Header -->
  <h1 class="text-3xl font-bold text-center">📊 Stats Overview</h1>

  <!-- Summary -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
    <div class="border rounded-xl p-4">
      <p class="text-lg font-semibold">Total Users</p>
      <p class="text-3xl font-bold">{total}</p>
    </div>
  
    <div class="border rounded-xl p-4 opacity-50">
      <p class="text-lg font-semibold">Total Transactions</p>
      <p class="text-xl">— (not yet fetched)</p>
    </div>

    <div class="border rounded-xl p-4 opacity-50">
      <p class="text-lg font-semibold">Average Tx Value</p>
      <p class="text-xl">— (not yet fetched)</p>
    </div>
  </div>

  <!-- Users list -->
  <section>
    <h2 class="text-xl font-semibold mt-6 mb-3">Users</h2>
    
    <div class="overflow-x-auto border rounded-xl">
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-3">#</th>
            <th class="p-3">Name</th>
            <th class="p-3">Codename</th>
            <th class="p-3">Date Joined</th>
          </tr>
        </thead>

        <tbody>
          {#each users as u, i}
          <tr class="border-b hover:bg-gray-50">
            <td class="p-3 font-medium">{i + 1}</td>
            <td class="p-3">{u.name ?? "-"}</td>
            <td class="p-3">{u.codename ?? "-"}</td>
            <td class="p-3 text-gray-600">
              {u.date_created?.toString().slice(0, 10) ?? "-"}
            </td>
          </tr>
          {/each}

          {#if users.length === 0}
          <tr>
            <td colspan="4" class="p-4 text-center text-gray-500">
              No users found.
            </td>
          </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </section>
</div>
