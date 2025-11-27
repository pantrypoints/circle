<script lang="ts">
  import { goto } from '$app/navigation';
  let { data } = $props();
  
  function handlePurchase() {
    goto(`/transaction/new?type=service&id=${data.service.id}&sellerId=${data.service.userId}`);
  }
</script>

<div class="max-w-4xl mx-auto">
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="md:flex">
      <div class="md:w-1/2">
        {#if data.service.photo1}
          <img src={data.service.photo1} alt={data.service.name} class="w-full h-96 object-cover" />
        {/if}
      </div>
      <div class="md:w-1/2 p-6">
        <h1 class="text-3xl font-bold mb-2">{data.service.name}</h1>
        <p class="text-gray-600 mb-4">{data.service.headline}</p>
        <div class="text-3xl font-bold text-blue-600 mb-4">{data.service.points} pts</div>
        <p class="text-gray-500 mb-6">per {data.service.measure}</p>
        <p class="mb-6">{data.service.description}</p>
        
        <button
          onclick={handlePurchase}
          class="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
        >
          Purchase
        </button>
        
        <div class="mt-6 pt-6 border-t">
          <p class="text-sm text-gray-600">Sold by</p>
          <button onclick={() => goto(`/shops/${data.seller.id}`)} class="flex items-center gap-3 mt-2 hover:underline">
            <img src={data.seller.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=seller'} 
                 alt={data.seller.name} 
                 class="w-10 h-10 rounded-full" />
            <div>
              <p class="font-semibold">{data.seller.name}</p>
              <p class="text-sm text-gray-500">{data.seller.location || 'No location'}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

