<script lang="ts">
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import { goto } from '$app/navigation';
  
  let { data } = $props();
</script>


<div class="max-w-6xl mx-auto">
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold">Services</h2>
    <button
      onclick={() => goto('/services/new')}
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      + Add Service
    </button>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.services as service}
      <ProductCard {service} />
    {/each}
  </div>
</div>

