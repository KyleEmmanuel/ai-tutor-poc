<script>
	import { Menu, X } from 'lucide-svelte';
	import SidebarStep from './SidebarStep.svelte';
	import { stepsStore } from '$lib/db.js';
	let { steps, currentStep } = $props();
	let expanded = $state(true);
	function openDrawer() {
		expanded = !expanded;
	}
	function checkIsDone(stepNumber) {
		if ($stepsStore.find((step) => step.number === stepNumber)?.done === true) {
			return true;
		}
		return false;
	}
</script>

<aside
	class="drawer {expanded
		? 'w-[400px]'
		: 'w-0'} flex flex-col items-center justify-start overflow-auto transition-all"
>
	<div class="flex w-full items-center justify-between border-b border-b-slate-400 p-5">
		<h1 class="font-bold">Course Content</h1>
		<button onclick={() => (expanded = !expanded)}>
			<X size={16} />
		</button>
	</div>
	{#each steps as step, index (step.number)}
		<SidebarStep
			isDone={checkIsDone(step.number)}
			isCurrent={currentStep === step.number}
			number={step.number}
			step={step.step}
		/>
	{/each}
</aside>

<button
	onclick={openDrawer}
	class="button absolute left-2 top-[50%] translate-y-[-50%] transition-all {expanded
		? 'translate-x-[400px]'
		: ''}"
>
	{#if expanded}
		<X size={24} />
	{:else}
		<Menu size={24} />
	{/if}
</button>

<style>
	.drawer {
		border-right: 1px solid rgb(192, 190, 190);
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		background-color: white;
	}
	.button {
		border: none;
		border-radius: 50%;
		padding: 0.5rem;
		width: 3rem;
		height: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #e5e7eb; /* Gray-200 */
		color: #4b5563; /* Gray-600 */
		overflow: hidden;
		cursor: pointer;
	}
	.button:hover::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-radius: 50%;
		background-color: rgba(59, 130, 246, 0.4); /* Blue-500 with transparency */
		animation: pulse 0.6s ease-out forwards;
	}

	/* Chat button and pause-resume button transition to gray background on hover */
	.button:hover {
		background-color: #e5e7eb; /* Gray-200 */
		color: #1f2937; /* Gray-800 */
	}
	@keyframes pulse {
		0% {
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			width: 200%;
			height: 200%;
			opacity: 0;
		}
	}
</style>
