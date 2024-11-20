<script>
	import { Mic, Pause, Play, MessageCircle } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let isPlaying = true;
	let isMicOn = false;
	let progress = 45; // Example progress percentage
	let isChatOpen = false;
	let chatMessage = '';

	const togglePlayPause = () => {
		isPlaying = !isPlaying;
	};

	const toggleMic = () => {
		isMicOn = !isMicOn;
	};

	const toggleChatbox = () => {
		isChatOpen = !isChatOpen;
	};

	const handleChatSubmit = (e) => {
		e.preventDefault();
		console.log('Chat message:', chatMessage);
		chatMessage = '';
	};
</script>

<div class="relative min-h-screen bg-gray-100 p-8">
	<!-- Course content -->
	<div class="mb-16">
		<h1 class="mb-4 text-3xl font-bold">Introduction to Svelte</h1>
		<p class="mb-4">
			Svelte is a popular JavaScript library for building user interfaces. It allows developers to
			create reusable UI components and manage the state of their applications efficiently.
		</p>
		<p>
			In this course, you'll learn the fundamentals of Svelte, including components, props, state,
			and stores. By the end, you'll be able to build your own Svelte applications from scratch.
		</p>
	</div>

	<!-- Mic button and voice-over message -->
	<div class="absolute right-8 top-8 flex items-center space-x-2">
		{#if isMicOn}
			<span class="text-sm font-medium text-blue-500">Voice over enabled</span>
		{/if}
		<button on:click={toggleMic} class="button mic {isMicOn ? 'active' : ''}">
			<Mic size={24} />
		</button>
	</div>

	<!-- Progress bar and play/pause button -->
	<div
		class="absolute bottom-8 left-1/2 flex w-2/3 -translate-x-1/2 items-center justify-center space-x-4"
	>
		<button on:click={togglePlayPause} class="button pause-resume">
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
			<div class="mb-2 h-[200px] w-64 rounded-lg bg-white p-4 shadow-lg" in:fly>
				<form on:submit|preventDefault={handleChatSubmit} class="flex h-full flex-col">
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
		on:click={toggleChatbox}
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
