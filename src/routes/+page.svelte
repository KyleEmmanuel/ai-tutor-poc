<script>
	import { text } from '@sveltejs/kit';
	import { Mic, Pause, Play, MessageCircle, ChevronRight } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import Toastify from 'toastify-js';
	import 'toastify-js/src/toastify.css';

	let { data } = $props();

	let isPlaying = $state(true);
	let isMicOn = $state(false);
	let progress = $state(data.progress); // Example progress percentage
	let isChatOpen = $state(false);
	let chatMessage = $state('');
	let currentStep = $state(data.currentStep);

	$effect(() => {
		progress = data.progress;
		currentStep = data.currentStep;
	});

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
		const updates = {
			progress: progress + 10
		};
		const res = await fetch('/api/db', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updates)
		});
		const response = await res.json();
		data = response;
	}

	async function handleChatSubmit(e) {
		try {
			e.preventDefault();
			console.log('Chat message:', chatMessage);
			chatMessage = '';
		} catch (error) {
			console.log(error);
			Toastify({
				text: 'Error saving data.'
			}).showToast();
		}
	}
</script>

<div class="relative min-h-screen bg-gray-100 p-8">
	<!-- Course content -->
	<div class="mb-16">
		<h1 class="mb-4 text-3xl font-bold">Time management in relevance to DISC styles.</h1>
		<p>
			Time management is crucial for productivity and efficiency. It relates to DISC styles as
			individuals with dominant (D) and conscientious (C) styles are more inclined towards effective
			time management. Emotional intelligence plays a role in time management through
			self-awareness, self-regulation, and empathy.
		</p>
	</div>

	<!-- Mic button and voice-over message -->
	<div class="absolute right-8 top-8 flex items-center space-x-2">
		{#if isMicOn}
			<span in:fly class="text-sm font-medium text-blue-500">Voice over enabled</span>
		{/if}
		<button onclick={toggleMic} class="button mic {isMicOn ? 'active' : ''}">
			<Mic size={24} />
		</button>
	</div>

	<!-- next button -->
	<button onclick={handleNext} class="button next">
		<ChevronRight size={24} />
	</button>

	<!-- Progress bar and play/pause button -->
	<div
		class="absolute bottom-8 left-1/2 flex w-2/3 -translate-x-1/2 items-center justify-center space-x-4"
	>
		<button onclick={togglePlayPause} class="button pause-resume">
			{#if isPlaying}
				<Pause size={24} />
			{:else}
				<Play size={24} />
			{/if}
		</button>
		<div class="h-2 w-full rounded-full bg-gray-200">
			<div class="h-2 rounded-full bg-blue-500" style="width: {progress}%;"></div>
		</div>
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
		class="chat button transition-all"
		style="position: absolute; bottom: 2.5rem; right: 2.5rem;"
	>
		<MessageCircle size={24} />
	</button>
</div>

<style>
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
