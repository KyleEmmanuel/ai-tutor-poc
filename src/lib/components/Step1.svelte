<script>
	import Toastify from 'toastify-js';
	import { askStep1 } from '$lib/api.js';
	import { phaseHeaders } from '$lib/appGlobals.js';
	import { globalLoader } from '$lib/loader.js';
	import { concurrent } from 'svelte-typewriter';
	import { API_URL } from '$lib/constants.js';
	import { safeJsonParse } from '$lib/utils.js';
	let message = $state('');
	const prompt = `the importance of time management and how it relates to DISC styles and Emotional Intelligence. 
        `;
	const data = {
		prompt
	};
	let source;
	(async () => {
		try {
			if (typeof EventSource !== 'undefined' && false) {
				globalLoader.set(true);
				source = new EventSource(`${API_URL}/step1?prompt=${prompt}`);
				source.onmessage = (event) => {
					let streamed_data = JSON.parse(event.data);

					if (streamed_data.message) {
						streamed_data.message = streamed_data.message;
						message += streamed_data.message;
						console.log(streamed_data.message);
					}
					if (streamed_data.data_stream_event) {
						let streaming_status = streamed_data.data_stream_event;
						console.log(streaming_status);
						if (streaming_status === 'thread.run.failed') {
							console.error('stream error');
						}
					}
					if (streamed_data.final_response) {
						globalLoader.set(false);
						message = streamed_data.final_response;
					}
				};
				source.onerror = (error) => {
					source.close();
					console.error(error);
					globalLoader.set(false);
				};
			} else {
				console.error('SSE Not supported by browser');
			}
		} catch (error) {
			console.log(error);
			Toastify({
				text: error
			}).showToast();
			globalLoader.set(false);
		}
	})();
</script>

<div class="mb-16">
	<h1 class="mb-4 text-3xl font-bold">{phaseHeaders[1]}</h1>
	<p>
		{message}
	</p>
</div>
