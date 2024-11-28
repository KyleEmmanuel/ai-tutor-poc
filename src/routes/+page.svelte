<script>
	import { Mic, Pause, Play, MessageCircle, ChevronRight } from 'lucide-svelte';
	import { fly, fade, slide } from 'svelte/transition';
	import Toastify from 'toastify-js';
	import 'toastify-js/src/toastify.css';
	import { disableNext, globalLoader } from '$lib/loader.js';
	import Step1 from '$lib/components/Step1.svelte';
	import Step2 from '$lib/components/Step2.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { dbStore, stepsStore } from '$lib/db.js';
	import { onDestroy } from 'svelte';
	import Step3 from '$lib/components/Step3.svelte';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import Step4 from '$lib/components/Step4.svelte';
	import Step5 from '$lib/components/Step5.svelte';
	import Step6 from '$lib/components/Step6.svelte';
	import Step7 from '$lib/components/Step7.svelte';

	let isPlaying = $state(true);
	let isMicOn = $state(false);
	let isChatOpen = $state(false);
	let chatMessage = $state('');
	let steps = {
		[phaseHeaders[1]]: [
			{ number: 1, step: 'Setting the stage', done: false },
			{ number: 2, step: 'Reflection', done: false }
		],
		[phaseHeaders[2]]: [
			{ number: 3, step: 'Understanding DISC styles in Time Management', done: false },
			{ number: 4, step: 'Personal Style Assessment', done: false },
			{ number: 5, step: 'Scenario Application', done: false }
		],
		[phaseHeaders[3]]: [
			{ number: 6, step: 'Practical tips for managing time effectively', done: false },
			{ number: 7, step: 'Personal Action Plan', done: false }
		],
		[phaseHeaders[4]]: []
	};
	stepsStore.set(steps);
	resetDb();
	let progress = $state(0);
	let currentStep = $state(1);

	const unsub = dbStore.subscribe((val) => {
		currentStep = val.currentStep;
	});

	stepsStore.subscribe((val) => {
		const keys = Object.keys(val);
		let numberOfDoneSteps = 0;
		let totalSteps = 0;
		keys.forEach((key) => {
			val[key].forEach((step) => {
				if (step.done === true) {
					numberOfDoneSteps += 1;
				}
				totalSteps += 1;
			});
		});
		const latestProgress = (numberOfDoneSteps / totalSteps) * 100;
		progress = latestProgress;
	});

	onDestroy(unsub);

	function togglePlayPause() {
		isPlaying = !isPlaying;
	}

	function toggleMic() {
		isMicOn = !isMicOn;
	}

	function toggleChatbox() {
		isChatOpen = !isChatOpen;
	}

	async function handleNext() {
		try {
			globalLoader.set(true);
			stepsStore.update((val) => {
				const keys = Object.keys(val);
				keys.forEach((key) => {
					const indexToUpdate = val[key].findIndex((step) => step.number === currentStep);
					if (indexToUpdate !== -1) {
						val[key][indexToUpdate].done = true;
					}
				});
				return val;

				// const updated = val.map((step) => {
				// 	if (step.number == currentStep) {
				// 		step.done = true;
				// 		return step;
				// 	}
				// 	return step;
				// });
				// return updated;
			});
			const updatedStep = currentStep + 1;
			const updates = {
				currentStep: updatedStep
			};
			dbStore.set(updates);
		} catch (error) {
			Toastify({
				text: 'Error saving data.'
			}).showToast();
		} finally {
			globalLoader.set(false);
			console.log($stepsStore);
		}
	}

	async function handleChatSubmit(e) {
		e.preventDefault();
		console.log('Chat message:', chatMessage);
		chatMessage = '';
	}

	function resetDb() {
		dbStore.set({ currentStep: 1, discStyle: null });
		stepsStore.update((val) => {
			const keys = Object.keys(val);
			keys.forEach((key) => {
				val[key] = val[key].map((step) => {
					step.done = false;
					return step;
				});
			});
			return val;

			// const update = val.map((step) => {
			// 	step.done = false;
			// 	return step;
			// });
			// return update;
		});
	}

	const stepComponents = [null, Step1, Step2, Step3, Step4, Step5, Step6, Step7];
	// localStorage.removeItem('db');
	let StepComponent = $derived(stepComponents[currentStep]);
</script>

<div class="relative min-h-screen bg-gray-100 p-8 pl-20 pr-24 font-sans">
	<!-- Course content -->
	<!-- Fading Transition for StepComponent -->
	<!-- {#key currentStep}
		<div class="step-container" transition:slide={{ duration: 2000 }}> -->
	<StepComponent />
	<!-- </div>
	{/key} -->

	<!-- Mic button and voice-over message -->
	<div class="absolute right-8 top-8 flex items-center space-x-2">
		{#if isMicOn}
			<span in:fly class="text-sm font-medium text-blue-500">Voice over enabled</span>
		{/if}
		<button
			onclick={toggleMic}
			class="button mic {isMicOn ? 'active' : ''}"
			style="position: fixed; top: 1rem; right: 2rem"
		>
			<Mic size={24} />
		</button>
	</div>

	<!-- next button -->
	{#if !$globalLoader && !$disableNext}
		<button onclick={handleNext} class="button next" style="position: fixed">
			<ChevronRight size={24} />
		</button>
	{/if}

	<!-- Progress bar and play/pause button -->
	<div
		class="absolute bottom-4 left-1/2 flex w-2/3 -translate-x-1/2 items-center justify-center space-x-4"
	>
		<button onclick={togglePlayPause} class="button pause-resume">
			{#if isPlaying}
				<Pause size={24} />
			{:else}
				<Play size={24} />
			{/if}
		</button>
		<p class="absolute bottom-9 left-1/2 flex -translate-x-1/2">{Math.ceil(progress)}%</p>
		<div class=" h-2 w-full rounded-full bg-gray-200">
			<div
				class="h-2 rounded-full bg-blue-500 transition-all"
				style="width: {Math.ceil(progress)}%;"
			></div>
		</div>
		<!-- Reset button -->
		<button onclick={resetDb} class="button reset bg-red-500 text-white hover:bg-red-600">
			Reset
		</button>
	</div>

	<!-- Chatbot icon and chat box -->
	<div class="absolute bottom-20 right-20">
		{#if isChatOpen}
			<div class="mb-2 h-[400px] w-[400px] rounded-lg bg-white p-4 shadow-lg" in:fly>
				<form onsubmit={handleChatSubmit} class="flex h-full flex-col">
					<textarea
						type="text"
						bind:value={chatMessage}
						class="mb-2 w-full grow rounded border p-2"
						placeholder="Type your message..."
					></textarea>
					<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white"> Send </button>
				</form>
			</div>
		{/if}
	</div>
	<button
		onclick={toggleChatbox}
		class="button chat transition-all"
		style="position: fixed; bottom: 2.5rem; right: 2.5rem;"
	>
		<MessageCircle size={24} />
	</button>
</div>
<Sidebar {currentStep} />

<style>
	.step-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.reset {
		padding: 0.5rem 1.25rem !important;
		border-radius: 0.375rem; /* Slightly rounded corners */
	}

	.reset:hover {
		background-color: #dc2626; /* Hover state for Reset button */
	}
	/* Common button styles */
	.button {
		position: relative;
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

	/* Mic button specific */
	.mic.active {
		background-color: #3b82f6; /* Blue-500 */
		color: white;
	}

	/* Hover effect: circular blue glow */
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

	/* Styles for the next button */
	/* Specific styling for the Next button */
	.next {
		position: absolute;
		top: 50%; /* Align vertically in the middle */
		right: 2rem; /* Position slightly inside the right edge */
		transform: translateY(-50%); /* Adjust for perfect vertical centering */
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
