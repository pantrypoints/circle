<script lang="ts">
  import '../app.css';
  import FAB from '$lib/components/FAB.svelte';
  import { page } from '$app/stores';
  
  let { data, children } = $props();
</script>

<div class="min-h-screen bg-gray-50 pb-20">
  <main class="container mx-auto px-4 py-6 max-w-7xl">
    {@render children()}
  </main>
  
  <FAB user={data.user} />
  
  {#if data.user && $page.route.id !== '/menu'}
    
  {/if}
</div>