<script>
	import Toastify from 'toastify-js';
	import { ask_ai_no_thread } from '$lib/api.js';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { globalLoader } from '$lib/loader.js';
	import { handleNext, waitFor } from '$lib/utils.js';
	import { dbStore } from '$lib/db.js';
	let plan = {
		objective: '',
		strategies: [],
		timeline: {},
		measurements_of_success: []
	};
	async function handleSubmit() {
		const messages = [
			{
				role: 'system',
				content: `The keys in the object correspond to questions and the values are their answers. Each key may contain multiple questions. Respond with a JSON string with the key of message with the value of your feedback on the questions and their answers if they are correct or not. Also, there should be a key for result with the value being a boolean if the questions are answered properly. Explain why the answers are correct or incorrect. Make sure that the response is a JSON string parsable by JavaScript's JSON.parse(). It shouldn't have '''json in it. `
			},
			{
				role: 'user',
				content: JSON.stringify({
					[questions[0]]: answer1,
					[questions[1]]: answer2,
					[questions[2]]: answer3
				})
			}
		];
		try {
			globalLoader.set(true);
			const res = await ask_ai_no_thread({ messages });
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
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[3]}</h1>
	<h2 class="mb-4 text-center text-xl font-bold">Personalized Time Management Plan</h2>
	<label for="objective" class="w-fit rounded-xl border-2 border-black p-5 text-2xl font-bold"
		>Objective</label
	>
	<textarea name="objective" id="objective" rows="4"></textarea>
	<h3 for="strategies" class="w-fit rounded-xl border-2 border-black p-5 text-2xl font-bold">
		Strategies
	</h3>
	<div class="flex w-full items-center">
		<label for="step1" class="m-0 w-1/5 p-0 text-center text-2xl">Step 1</label>
		<textarea class="grow" name="step1" id="step1"></textarea>
	</div>
	<div class="flex w-full items-center">
		<label for="step2" class="m-0 w-1/5 p-0 text-center text-2xl">Step 2</label>
		<textarea class="grow" name="step2" id="step2"></textarea>
	</div>
	<div class="flex w-full items-center">
		<label for="step3" class="m-0 w-1/5 p-0 text-center text-2xl">Step 3</label>
		<textarea class="grow" name="step3" id="step3"></textarea>
	</div>
	<button class="btn btn-info" onclick={handleSubmit}>Submit</button>
	<!-- <p>
		{message}
	</p> -->
</div>
