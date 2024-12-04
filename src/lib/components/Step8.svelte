<script>
	import Toastify from 'toastify-js';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import Info from './Info.svelte';
	import { planStore, reflectionStore } from '$lib/db.js';
	import { onMount } from 'svelte';
	import { aiStream } from '$lib/utils.js';
	import { dbStore } from '$lib/db.js';
	import { disableNext, globalLoader } from '$lib/loader.js';
	import { ask_ai_no_thread } from '$lib/api.js';
	console.log({ planStore: $planStore, reflectionStore: $reflectionStore });
	let reflectionKeys = Object.keys($reflectionStore);
	// onMount(() => {
	// 	window.scrollTo({
	// 		top: 0,
	// 		behavior: 'smooth'
	// 	});
	// 	disableNext.set(true);
	// 	handleSubmit();
	// });
	async function handleSubmit() {
		const messages = [
			{
				role: 'system',
				content: `Based on the provided object, give your feedback on the reflections and action plan made by the user. Your response must be a string.`
			},
			{
				role: 'user',
				content: JSON.stringify({ ...$planStore, ...$reflectionStore })
			}
		];
		try {
			globalLoader.set(true);
			const res = await ask_ai_no_thread({ messages });
			const response = await res.json();
			const finalResponse = response.response;
			console.log(finalResponse);
			const message = finalResponse;
			Toastify({
				text: `Your tutor's feedback: ${message}`,
				position: 'center',
				close: true,
				duration: -1
			}).showToast();
		} catch (error) {
			console.log(error);
			Toastify({
				text: 'Something went wrong. Please try again.'
			}).showToast();
		} finally {
			globalLoader.set(false);
		}
	}
	let infoContent = 'This is a recap of key concepts covered in the course.';
</script>

<div class="mb-16">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[4]}</h1>
	<Info {infoContent} />
	<h1 class="pb-2 text-center text-xl font-bold">Your Reflections:</h1>
	<table class="table table-zebra">
		<thead>
			<tr>
				<th>Question</th>
				<th>Your answer</th>
			</tr>
		</thead>
		<tbody>
			{#each reflectionKeys as reflectionKey}
				<tr>
					<td>{reflectionKey}</td>
					<td>{$reflectionStore[reflectionKey]}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<h1 class="py-2 text-center text-xl font-bold">Your Action Plan:</h1>
	<h2>Your Objective: {$planStore.objective}</h2>
	<h2>Your strategies:</h2>
	<ul class="list">
		{#each $planStore.strategies as strategy}
			<li class="item">
				<span class="icon">✔️</span>
				<span class="text">{strategy}</span>
			</li>
		{/each}
	</ul>
	<h2>Your Timeline:</h2>
	<ul class="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
		{#each Object.keys($planStore.timeline) as timeline}
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
					<time class="font-mono italic">{timeline}</time>
					<div>{$planStore.timeline[timeline]}</div>
				</div>
				<hr />
			</li>
		{/each}
	</ul>
	<h2>Your Measurements of Success:</h2>
	<ul class="list">
		{#each $planStore.measurements_of_success as measurement}
			<li class="item">
				<span class="icon">✔️</span>
				<span class="text">{measurement}</span>
			</li>
		{/each}
	</ul>
	<a class="btn btn-primary w-full" href="/cert">Finish course</a>
</div>

<style>
	h2 {
		padding-top: 1rem;
		padding-bottom: 1rem;
		text-align: center;
	}
	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
	}
	.list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.item {
		display: flex;
		align-items: center;
		background: #f9f9f9;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 12px 16px;
		margin-bottom: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s;
	}
	.item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}
	.icon {
		font-size: 1.5rem;
		margin-right: 12px;
		color: #4caf50; /* Green color for a positive vibe */
	}
	.text {
		font-size: 1rem;
		color: #333;
	}
</style>
