<script>
	import Toastify from 'toastify-js';
	import { ask_ai_no_thread } from '$lib/api.js';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { disableNext, globalLoader } from '$lib/loader.js';
	import { handleNext, waitFor } from '$lib/utils.js';
	import { dbStore, planStore } from '$lib/db.js';
	import { ArrowRight } from 'lucide-svelte';
	import Info from './Info.svelte';
	import { onDestroy, onMount } from 'svelte';
	onMount(() => {
		disableNext.set(true);
	});
	onDestroy(() => {
		disableNext.set(false);
	});
	let plan = $planStore
		? $planStore
		: {
				objective: '',
				strategies: [],
				timeline: {},
				measurements_of_success: []
			};
	console.log({ plan: $planStore });
	// Set default values
	let objective = plan?.objective || '';

	let strat1 = plan?.strategies?.[0] || '',
		strat2 = plan?.strategies?.[1] || '',
		strat3 = plan?.strategies?.[2] || '';

	let time1 = Object.keys(plan?.timeline || {})[0] || '',
		time2 = Object.keys(plan?.timeline || {})[1] || '',
		time3 = Object.keys(plan?.timeline || {})[2] || '';

	let goal1 = time1 ? plan.timeline[time1] : '',
		goal2 = time2 ? plan.timeline[time2] : '',
		goal3 = time3 ? plan.timeline[time3] : '';

	let timeEl1, timeEl2, timeEl3, goalEl1, goalEl2, goalEl3;

	let measure1 = plan?.measurements_of_success?.[0] || '',
		measure2 = plan?.measurements_of_success?.[1] || '',
		measure3 = plan?.measurements_of_success?.[2] || '';

	async function handleSubmit() {
		plan.objective = objective;
		plan.strategies = [strat1, strat2, strat3];
		plan.timeline = {
			[timeEl1?.textContent]: goalEl1?.textContent,
			[timeEl2?.textContent]: goalEl2?.textContent,
			[timeEl3?.textContent]: goalEl3?.textContent
		};
		plan.measurements_of_success = [measure1, measure2, measure3];
		planStore.set(plan);
		handleNext($dbStore.currentStep);
		// const messages = [
		// 	{
		// 		role: 'system',
		// 		content: `The keys in the object correspond to questions and the values are their answers. Each key may contain multiple questions. Respond with a JSON string with the key of message with the value of your feedback on the questions and their answers if they are correct or not. Also, there should be a key for result with the value being a boolean if the questions are answered properly. Explain why the answers are correct or incorrect. Make sure that the response is a JSON string parsable by JavaScript's JSON.parse(). It shouldn't have '''json in it. `
		// 	},
		// 	{
		// 		role: 'user',
		// 		content: JSON.stringify({
		// 			[questions[0]]: answer1,
		// 			[questions[1]]: answer2,
		// 			[questions[2]]: answer3
		// 		})
		// 	}
		// ];
		// try {
		// 	globalLoader.set(true);
		// 	const res = await ask_ai_no_thread({ messages });
		// 	const response = await res.json();
		// 	console.log(response);
		// 	const finalResponse = JSON.parse(response.response);
		// 	const result = finalResponse.result;
		// 	const message = finalResponse.message;
		// 	console.log(finalResponse);
		// 	if (result) {
		// 		Toastify({
		// 			text: `Good job! ${message}`,
		// 			position: 'center',
		// 			close: true,
		// 			duration: -1
		// 		}).showToast();
		// 		// await waitFor(3000);
		// 		handleNext($dbStore.currentStep);
		// 		// implement next here
		// 	} else {
		// 		Toastify({
		// 			text: message,
		// 			position: 'center',
		// 			close: true,
		// 			duration: -1
		// 		}).showToast();
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// 	Toastify({
		// 		text: 'Something went wrong. Please try again.'
		// 	}).showToast();
		// } finally {
		// 	globalLoader.set(false);
		// }
	}
</script>

<div class="mb-16 flex flex-col gap-4">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[3]}</h1>
	<h2 class="mb-4 text-center text-xl font-bold">Personalized Time Management Plan</h2>
	<div class="flex items-center gap-2">
		<h3 class="w-fit rounded-xl border-2 border-black p-5 text-xl font-bold">Objective</h3>
		<Info
			infoContent="Type here what you are aiming to achieve in improving your time management."
		/>
	</div>
	<textarea name="objective" id="objective" rows="4" bind:value={objective}></textarea>
	<div class="flex items-center gap-2">
		<h3 class="w-fit rounded-xl border-2 border-black p-5 text-xl font-bold">Strategies</h3>
		<Info infoContent="Specify time management techniques that you think will be effective." />
	</div>
	<div class="flex w-full items-center">
		<label for="step1" class="m-0 w-[10%] p-0 text-center text-xl">Step 1</label>
		<div class="w-[5%]">
			<ArrowRight size={40} />
		</div>
		<textarea class="grow" name="step1" id="step1" bind:value={strat1}></textarea>
	</div>
	<div class="flex w-full items-center">
		<label for="step2" class="m-0 w-[10%] p-0 text-center text-xl">Step 2</label>
		<div class="w-[5%]">
			<ArrowRight size={40} />
		</div>
		<textarea class="grow" name="step2" id="step2" bind:value={strat2}></textarea>
	</div>
	<div class="flex w-full items-center">
		<label for="step3" class="m-0 w-[10%] p-0 text-center text-xl">Step 3</label>
		<div class="w-[5%]">
			<ArrowRight size={40} />
		</div>
		<textarea class="grow" name="step3" id="step3" bind:value={strat3}></textarea>
	</div>
	<div class="flex items-center gap-2">
		<h3 class="w-fit rounded-xl border-2 border-black p-5 text-xl font-bold">timeline</h3>
		<Info infoContent="Outline here when you will implement your strategies." />
	</div>
	<div class="m-auto">
		<Info infoContent="Each time and goal here is editable. Edit these as you see fit." />
	</div>

	<ul class="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
		<li>
			<div class="timeline-middle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-5 w-5"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class="timeline-start mb-10 md:text-end">
				<time contenteditable="true" class="font-mono italic" bind:this={timeEl1}
					>{time1 || 'Month 1'}</time
				>
				<div contenteditable="true" bind:this={goalEl1}>{goal1 || 'Put your goal here'}</div>
			</div>
			<hr />
		</li>
		<li>
			<hr />
			<div class="timeline-middle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-5 w-5"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class="timeline-end mb-10">
				<time contenteditable="true" class="font-mono italic" bind:this={timeEl2}
					>{time2 || 'Month 2'}</time
				>
				<div contenteditable="true" bind:this={goalEl2}>{goal2 || 'Put your goal here'}</div>
			</div>
			<hr />
		</li>
		<li>
			<hr />
			<div class="timeline-middle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-5 w-5"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class="timeline-start mb-10 md:text-end">
				<time contenteditable="true" class="font-mono italic" bind:this={timeEl3}
					>{time3 || 'Month 3'}</time
				>
				<div contenteditable="true" class="" bind:this={goalEl3}>
					{goal3 || 'Put your goal here'}
				</div>
			</div>
			<hr />
		</li>
	</ul>
	<div class="flex items-center gap-2">
		<h3 class="w-fit rounded-xl border-2 border-black p-5 text-xl font-bold">
			Measurements of Success
		</h3>
		<Info infoContent="Outline here the methods that you will use to track your progress." />
	</div>

	<div class="flex w-full items-center">
		<label for="measure1" class="m-0 w-[10%] p-0 text-center text-xl">1.</label>
		<textarea class="grow" name="measure1" id="measure1" bind:value={measure1}></textarea>
	</div>
	<div class="flex w-full items-center">
		<label for="measure2" class="m-0 w-[10%] p-0 text-center text-xl">2.</label>
		<textarea class="grow" name="measure2" id="measure2" bind:value={measure2}></textarea>
	</div>
	<div class="flex w-full items-center">
		<label for="measure3" class="m-0 w-[10%] p-0 text-center text-xl">3.</label>
		<textarea class="grow" name="measure3" id="measure3" bind:value={measure3}></textarea>
	</div>
	<button class="btn btn-info" onclick={handleSubmit}>Submit</button>
	<!-- <p>
		{message}
	</p> -->
</div>
