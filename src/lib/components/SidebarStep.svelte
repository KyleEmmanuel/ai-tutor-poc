<script>
	import Toastify from 'toastify-js';
	import { dbStore, stepsStore } from '$lib/db.js';
	import { Check, Lock } from 'lucide-svelte';
	import { derived } from 'svelte/store';
	import { onDestroy } from 'svelte';

	let { isCurrent, number, step } = $props();
	let isDone = $state();
	const unsub = stepsStore.subscribe((val) => {
		const keys = Object.keys(val);
		for (const key of keys) {
			let currentStepObject = val[key].find((step) => step.number === number);
			if (currentStepObject) {
				isDone = currentStepObject?.done ? true : false;
				break;
			}
		}
		// isDone = val.find((step) => step.number === number)?.done === true;
	});

	onDestroy(unsub);

	function clickFunction() {
		if (!isDone) {
			Toastify({
				text: 'This content is locked.'
			}).showToast();
			return;
		}
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
	<!-- {#if isDone} -->
	<i class="absolute right-2 top-2">
		{#key isDone}
			{#if isDone}
				<Check size={20} />
			{:else if number !== 1 && !isCurrent}
				<Lock size={20} />
			{/if}
		{/key}
	</i>
	<!-- {/if} -->
	<p>{number}. {step}</p>
</div>
