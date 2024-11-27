<script>
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { aiStream } from '$lib/utils.js';
	let message = $state('');
	const prompt = `Overview of the four DISC styles (Dominance, Influence, Steadiness, Compliance) and how each approaches time management. `;
	aiStream(
		prompt,
		(newMessage) => (message += newMessage),
		(finalMessage) => (message = finalMessage)
	);
</script>

<div class="mb-16 flex flex-col gap-4">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[2]}</h1>
	<p>
		{message}
	</p>
</div>
