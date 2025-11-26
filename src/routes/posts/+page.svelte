<script lang="ts">
  import PostCard from '$lib/components/PostCard.svelte';
  import { invalidateAll } from '$app/navigation';
  
  let { data } = $props();
  let content = $state('');
  let loading = $state(false);
  let error = $state('');
  
  async function createPost() {
    if (!content.trim()) {
      error = 'Please enter some content';
      return;
    }
    
    loading = true;
    error = '';
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      
      if (response.ok) {
        content = '';
        await invalidateAll(); // Refresh the page data
      } else {
        const result = await response.json();
        error = result.message || 'Failed to create post';
      }
    } catch (err) {
      console.error('Error creating post:', err);
      error = 'Network error. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="max-w-2xl mx-auto">
  <h2 class="text-2xl font-bold mb-6">Posts</h2>
  
  <div class="bg-white p-4 rounded-lg shadow mb-6">
    <textarea
      bind:value={content}
      placeholder="What's on your mind?"
      class="w-full border rounded p-3 mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      rows="3"
      disabled={loading}
    ></textarea>
    
    {#if error}
      <div class="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
        {error}
      </div>
    {/if}
    
    <button
      onclick={createPost}
      disabled={loading || !content.trim()}
      class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {loading ? 'Posting...' : 'Post'}
    </button>
  </div>
  
  <div class="space-y-4">
    {#each data.posts as post}
      <PostCard {post} />
    {:else}
      <div class="text-center text-gray-500 py-8">
        No posts yet. Be the first to post!
      </div>
    {/each}
  </div>
  
  <div class="flex justify-between mt-6">
    {#if data.page > 1}
      <a href="/posts?page={data.page - 1}" class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Previous</a>
    {:else}
      <div></div>
    {/if}
    
    {#if data.hasMore}
      <a href="/posts?page={data.page + 1}" class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Next</a>
    {/if}
  </div>
</div>