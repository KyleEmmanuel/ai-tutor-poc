<script>
	import Info from './Info.svelte';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { addTippy, aiStream } from '$lib/utils.js';
	import Voice from './Voice.svelte';
	let message = $state('');
	const prompt = `Give practical tips for managing time effectively. Give me html string so i'll just render the html. Only give the answer. Do not add any remarks like sure, etc. Make the answer at least 5 paragraphs.`;
	aiStream(
		prompt,
		(newMessage) => (message += newMessage),
		(finalMessage) => (message = finalMessage)
	);
	let infoContent = 'Practical tips for managing time effectively.';
</script>

<div class="mb-16 flex flex-col gap-4">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[3]}</h1>
	<div class="flex w-full justify-between">
		<Info {infoContent} />
		<Voice {message} />
	</div>
	<p>
		{@html message}
	</p>
</div>
