<script>
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { aiStream } from '$lib/utils.js';
	let message = $state('');
	const prompt = `What is the importance of time management and how it relates to DISC styles and Emotional Intelligence.
        `;
	// aiStream(
	// 	prompt,
	// 	(newMessage) => (message += newMessage),
	// 	(finalMessage) => (message = finalMessage)
	// );
</script>

<div class="mb-16">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[1]}</h1>
	<p>
		{message}
	</p>
</div>
