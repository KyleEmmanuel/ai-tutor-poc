<script>
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { aiStream } from '$lib/utils.js';
	import Voice from './Voice.svelte';
	import Info from './Info.svelte';
	let message = $state('');
	const prompt = `What is the importance of time management and how it relates to DISC styles and Emotional Intelligence. Only give the answer. Do not add any remarks like sure, etc. Make the answer at least 5 paragraphs.
        `;
	aiStream(
		prompt,
		(newMessage) => (message += newMessage),
		(finalMessage) => (message = finalMessage)
	);
	let infoContent =
		'The importance of time management and how it relates to DISC styles and Emotional Intelligence';
</script>

<div class="mb-16">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[1]}</h1>
	<div class="flex w-full justify-between">
		<Info {infoContent} />
		<Voice {message} />
	</div>
	<p>
		{message}
	</p>
</div>
