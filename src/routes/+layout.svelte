<script>
	import { globalLoader } from '$lib/loader.js';
	import Loader from '$lib/Loader.svelte';
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

{#if $globalLoader}
	<Loader />
{/if}
