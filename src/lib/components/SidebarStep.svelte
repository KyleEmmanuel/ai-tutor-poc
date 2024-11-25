<script>
	import { dbStore } from '$lib/db.js';
	import { Check } from 'lucide-svelte';

	let { isDone, isCurrent, number, step } = $props();
	function clickFunction() {
		const data = {
			currentStep: number
		};
		dbStore.set(data);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={clickFunction}
	class="relative w-full cursor-pointer px-10 py-3 transition-all hover:bg-gray-300 {isCurrent
		? 'bg-gray-300'
		: ''}"
>
	{#if isDone}
		<i class="absolute right-2 top-2">
			<Check size={20} />
		</i>
	{/if}
	<p>{number}. {step}</p>
</div>
