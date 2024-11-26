<script>
	import Toastify from 'toastify-js';
	import { ask_ai_no_thread } from '$lib/api.js';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { globalLoader } from '$lib/loader.js';
	import { waitFor } from '$lib/utils.js';
	let questions = [
		'What do you think are your strengths when it comes to managing your time?',
		'On what aspects of your time management do you think need improving?',
		'Identify specific scenarios of when your time management is effective or challenging.'
	];
	let answer1 = '';
	let answer2 = '';
	let answer3 = '';
	async function handleSubmit() {
		const messages = [
			{
				role: 'system',
				content: `You are an assistant if the JSON object is proper. The keys in the object correspond to questions and the values are their answers. Respond with a JSON string with the key of message with the value of your feedback on the questions and their answers if they are correct or not. Also, there should be a key for result with the value being a boolean if the questions are answered properly. Explain why the answers are correct or incorrect. ENSURE THAT THE RESPONSE IS A JSON STRING.`
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
					text: message,
					position: 'center',
					close: true,
					duration: -1
				}).showToast();
				await waitFor(3000);
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
