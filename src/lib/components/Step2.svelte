<script>
	import { fade } from 'svelte/transition';
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
		'What do you think are your strengths when it comes to managing your time?',
		'On what aspects of your time management do you think need improving?',
		'Identify specific scenarios of when your time management is effective or challenging.'
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
				content: `You are an assistant that checks if the JSON object is proper. The keys in the object correspond to questions and the values are their answers. Response with a JSON object containing the properties message and result, with message containing your feedback to the questions-answers provided and the result being a boolean if the answers provided correctly answer the questions.`
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
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[1]}</h1>
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
