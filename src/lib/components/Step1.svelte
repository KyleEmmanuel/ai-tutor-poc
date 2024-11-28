<script>
	import { phaseHeaders } from '$lib/appGlobals.js';
	import Info from './Info.svelte';
	let message = $state('');
	const prompt = `What is the importance of time management and how it relates to DISC styles and Emotional Intelligence. Only give the answer.
        `;
	// aiStream(
	// 	prompt,
	// 	(newMessage) => (message += newMessage),
	// 	(finalMessage) => (message = finalMessage)
	// );
	let infoContent =
		'The importance of time management and how it relates to DISC styles and Emotional Intelligence';
</script>

<div class="mb-16">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[1]}</h1>
	<Info {infoContent} />
	<p>
		{message}
	</p>
</div>
