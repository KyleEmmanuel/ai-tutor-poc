<script>
	import { dbStore } from '$lib/db.js';
	import { globalLoader } from '$lib/loader.js';
	import Loader from '$lib/Loader.svelte';
	import { onDestroy } from 'svelte';
	import '../app.css';
	import 'toastify-js/src/toastify.css';
	let { children } = $props();
	let currentStep = $state();
	const unsub = dbStore.subscribe((val) => {
		currentStep = val.currentStep;
	});
	onDestroy(unsub);
</script>

{@render children()}

{#if $globalLoader}
	<Loader />
{/if}
