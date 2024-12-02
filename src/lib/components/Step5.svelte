<script>
	import Toastify from 'toastify-js';
	import { ask_ai_no_thread } from '$lib/api.js';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { disableNext, globalLoader } from '$lib/loader.js';
	import { handleNext, waitFor } from '$lib/utils.js';
	import { dbStore, reflectionStore } from '$lib/db.js';
	import { onDestroy, onMount } from 'svelte';
	onMount(() => {
		disableNext.set(true);
	});
	onDestroy(() => {
		disableNext.set(false);
	});
	let questions = [
		`You’re overwhelmed with tasks and a looming deadline—how do your emotions affect your ability to prioritize?`,
		`A teammate feels frustrated about an unfair workload—how can you address their concerns to improve teamwork?`,
		`An urgent task disrupts your planned day—how will you manage your emotions to stay productive?`
	];
	let answer1 = '';
	let answer2 = '';
	let answer3 = '';
	async function handleSubmit() {
		const reflection = {
			[questions[0]]: answer1,
			[questions[1]]: answer2,
			[questions[2]]: answer3
		};
		reflectionStore.update((val) => {
			return { ...val, ...reflection };
		});
		const messages = [
			{
				role: 'system',
				content: `The keys in the object correspond to questions and the values are their answers. Each key may contain multiple questions. Respond with a JSON string with the key of message with the value of your feedback on the questions and their answers if they are correct or not. Also, there should be a key for result with the value being a boolean if the questions are answered properly. Explain why the answers are correct or incorrect. Make sure that the response is a JSON string parsable by JavaScript's JSON.parse(). It shouldn't have '''json in it. `
			},
			{
				role: 'user',
				content: JSON.stringify(reflection)
			}
		];
		try {
			globalLoader.set(true);
			const res = await ask_ai_no_thread({ messages, json: true });
			const response = await res.json();
			console.log(response);
			const finalResponse = JSON.parse(response.response);
			const result = finalResponse.result;
			const message = finalResponse.message;
			console.log(finalResponse);
			if (result) {
				Toastify({
					text: `Good job! ${message}`,
					position: 'center',
					close: true,
					duration: -1
				}).showToast();
				// await waitFor(3000);
				handleNext($dbStore.currentStep);
				// implement next here
			} else {
				Toastify({
					text: message,
					position: 'center',
					close: true,
					duration: -1
				}).showToast();
			}
		} catch (error) {
			console.log(error);
			Toastify({
				text: 'Something went wrong. Please try again.'
			}).showToast();
		} finally {
			globalLoader.set(false);
		}
	}
</script>

<div class="mb-16 flex flex-col gap-4">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[2]}</h1>
	<label for="question1">{questions[0]}</label>
	<textarea name="question1" id="question1" bind:value={answer1}></textarea>
	<label for="question2">{questions[1]}</label>
	<textarea name="question2" id="question2" bind:value={answer2}></textarea>
	<label for="question3">{questions[2]}</label>
	<textarea name="question3" id="question3" bind:value={answer3}></textarea>
	<button class="btn btn-info" onclick={handleSubmit}>Submit</button>
	<!-- <p>
		{message}
	</p> -->
</div>
