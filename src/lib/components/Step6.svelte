<script>
	import Info from './Info.svelte';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { addTippy, aiStream } from '$lib/utils.js';
	let message = $state('');
	const prompt = `Give practical tips for managing time effectively. Give me html string so i'll just render the html.`;
	// aiStream(
	// 	prompt,
	// 	(newMessage) => (message += newMessage),
	// 	(finalMessage) => (message = finalMessage)
	// );
	let infoContent = 'Practical tips for managing time effectively.';
</script>

<div class="mb-16 flex flex-col gap-4">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[2]}</h1>
	<Info {infoContent} />
	<p>
		{@html message}
	</p>
</div>
