<script>
	import { Mic } from 'lucide-svelte';
	import { globalLoader } from '$lib/loader.js';
	import { fly } from 'svelte/transition';
	import { API_URL } from '$lib/constants.js';
	import Loader from '$lib/Loader.svelte';
	import { onDestroy } from 'svelte';
	let { message } = $props();
	let isPlaying = $state(false);

	let error = '';
	let audio = null; // To store the Audio instance
	let ttsLoading = $state(false);
	let streaming = false;

	// async function generateSpeech() {
	// 	error = '';

	// 	try {
	// 		ttsLoading = true;
	// 		const response = await fetch(`${API_URL}/tts`, {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({ message })
	// 		});

	// 		const data = await response.json();

	// 		if (response.ok) {
	// 			if (audio) {
	// 				// Stop and reset any existing audio
	// 				audio.pause();
	// 				audio = null;
	// 			}

	// 			// Assuming `data.speech` is a base64-encoded string or an audio URL
	// 			if (data.speech) {
	// 				const blob = new Blob([Uint8Array.from(atob(data.speech), (c) => c.charCodeAt(0))], {
	// 					type: 'audio/mpeg'
	// 				});
	// 				const audioUrl = URL.createObjectURL(blob);

	// 				// Create a new Audio instance
	// 				audio = new Audio(audioUrl);
	// 			} else if (data.speech_url) {
	// 				// If you return a file URL from the server
	// 				audio = new Audio(data.speech_url);
	// 				audio.play();
	// 			}

	// 			// Listen for the `ended` event
	// 			audio.addEventListener('ended', () => {
	// 				isPlaying = false;
	// 				console.log('Audio finished playing');
	// 			});

	// 			// Start playback and set the state
	// 			audio.play();
	// 			isPlaying = true;
	// 			ttsLoading = false;
	// 		} else {
	// 			error = data.error || 'Failed to generate speech';
	// 		}
	// 	} catch (err) {
	// 		error = 'An error occurred while generating speech';
	// 		console.error(err);
	// 		ttsLoading = false;
	// 	}
	// }
	async function generateSpeech() {
		if (isPlaying) return;
		error = '';

		try {
			ttsLoading = true;
			const response = await fetch(`${API_URL}/tts`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message })
			});

			if (!response.ok) {
				const errorData = await response.json();
				error = errorData.error || 'Failed to generate speech';
				ttsLoading = false;
				return;
			}

			if (audio) {
				// Stop and reset any existing audio
				audio.pause();
				audio = null;
			}

			// Create a MediaSource for streaming
			const mediaSource = new MediaSource();
			const audioUrl = URL.createObjectURL(mediaSource);
			audio = new Audio(audioUrl);

			audio.addEventListener('ended', () => {
				isPlaying = false;
				console.log('Audio finished playing');
			});

			mediaSource.addEventListener('sourceopen', async () => {
				const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
				const reader = response.body.getReader();
				let isFirstChunk = true;

				async function readStream() {
					const { done, value } = await reader.read();

					if (done) {
						mediaSource.endOfStream();
						return;
					}

					// Append the audio chunk to the source buffer
					sourceBuffer.appendBuffer(value);

					if (isFirstChunk) {
						// Play the audio after the first chunk is appended
						audio.play();
						isPlaying = true;
						isFirstChunk = false;
					}

					// Continue reading
					sourceBuffer.addEventListener('updateend', readStream, { once: true });
				}

				readStream();
			});

			ttsLoading = false;
		} catch (err) {
			error = 'An error occurred while generating speech';
			console.error(err);
			ttsLoading = false;
		}
	}
	onDestroy(() => {
		if (audio) {
			audio.pause();
			audio = null;
		}
	});
</script>

{#if ttsLoading}
	<Loader />
{/if}

{#if message && !$globalLoader}
	<button class="flex items-center gap-2" onclick={generateSpeech}>
		{#if isPlaying}
			<span in:fly class=" text-sm font-medium text-blue-500">Voice over enabled</span>
		{/if}
		<Mic /></button
	>
{/if}
