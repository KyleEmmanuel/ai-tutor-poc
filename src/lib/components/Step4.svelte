<script>
	import Card from './Card.svelte';
	import { Info } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { addTippy, aiStream, handleNext, setDiscStyle } from '$lib/utils.js';
	import dominance from '$lib/assets/images/dominance.webp';
	import influence from '$lib/assets/images/influence.webp';
	import steadiness from '$lib/assets/images/steadiness.webp';
	import conscientiousness from '$lib/assets/images/conscientiousness.webp';
	import { dbStore } from '$lib/db.js';
	import { onDestroy, onMount, tick } from 'svelte';
	import { disableNext } from '$lib/loader.js';
	onMount(() => {
		disableNext.set(true);
	});
	onDestroy(() => {
		disableNext.set(false);
	});
	let infoContent = 'Choose the DISC style that most suits you.';
	let dominanceSummary = 'Bold and results-driven.';
	let influenceSummary = 'Social and enthusiastic.';
	let steadinessSummary = 'Calm and supportive.';
	let conscientiousnessSummary = 'Detail-oriented and analytical.';
	let dominanceBody =
		'Focused on results and achieving goals, individuals with the Dominance style are confident, decisive, and assertive. They thrive in challenges, value control, and can sometimes be perceived as direct or impatient. They prioritize efficiency and getting things done quickly.';
	let influenceBody =
		'Energetic and people-oriented, the Influence style is characterized by enthusiasm, charm, and positivity. These individuals excel in building relationships, enjoy collaborating, and inspire others. They tend to value recognition and may sometimes overlook details in favor of maintaining a lively environment.';
	let steadinessBody =
		'Reliable and empathetic, Steadiness individuals value harmony and stability. They are excellent listeners, patient, and nurturing, often going out of their way to support others. Preferring routine and predictability, they are resistant to sudden change but excel in creating consistent and cooperative teams.';
	let conscientiousnessBody =
		'Methodical and structured, those with the Conscientiousness style emphasize accuracy, quality, and order. They are analytical thinkers who rely on facts and logic to make decisions. Known for their perfectionism, they can sometimes come across as overly cautious or critical.';
</script>

<div class="mb-16 flex flex-col gap-4">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[2]}</h1>
	<i
		class="block w-fit"
		use:addTippy={() => {
			return { content: infoContent, placement: 'right' };
		}}><Info /></i
	>
	<div class="m-auto grid h-4/5 w-4/5 grid-cols-2 grid-rows-2 gap-5">
		<Card
			imgSrc={dominance}
			title={'Dominance'}
			summary={dominanceSummary}
			tooltip={dominanceBody}
			onclickFn={async () => {
				setDiscStyle('Dominance');
				await tick();
				const currentDisc = document.getElementById('current-disc');
				if (currentDisc) {
					currentDisc.scrollIntoView();
				}
			}}
		/>
		<Card
			imgSrc={influence}
			title={'Influence'}
			summary={influenceSummary}
			tooltip={influenceBody}
			onclickFn={async () => {
				setDiscStyle('Influence');
				await tick();
				const currentDisc = document.getElementById('current-disc');
				if (currentDisc) {
					currentDisc.scrollIntoView();
				}
			}}
		/>
		<Card
			imgSrc={steadiness}
			title={'Steadiness'}
			summary={steadinessSummary}
			tooltip={steadinessBody}
			onclickFn={async () => {
				setDiscStyle('Steadiness');
				await tick();
				const currentDisc = document.getElementById('current-disc');
				if (currentDisc) {
					currentDisc.scrollIntoView();
				}
			}}
		/>
		<Card
			imgSrc={conscientiousness}
			title={'Conscientiousness'}
			summary={conscientiousnessSummary}
			tooltip={conscientiousnessBody}
			onclickFn={async () => {
				setDiscStyle('Conscientiousness');
				await tick();
				const currentDisc = document.getElementById('current-disc');
				if (currentDisc) {
					currentDisc.scrollIntoView();
				}
			}}
		/>
	</div>
	{#if $dbStore.discStyle}
		<br />
		<span id="current-disc" class="text-center"
			>Your current disc style is: {$dbStore.discStyle}.
			<button
				class="cursor-pointer border-0 text-blue-500 underline"
				onclick={() => handleNext($dbStore.currentStep)}>Next Section</button
			></span
		>
	{/if}
</div>
