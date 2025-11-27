<script lang="ts">
  import { goto } from '$app/navigation';
  
  let { user } = $props();
  
  const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
</script>

<button 
  onclick={() => goto('/menu')}
  class="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow overflow-hidden border-4 border-white z-50"
  aria-label="Open menu"
>
  <img 
    src={user.avatar || defaultAvatar} 
    alt={user.name}
    class="w-full h-full object-cover"
  />
</button>

