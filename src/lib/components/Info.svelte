<script>
	import { addTippy } from '$lib/utils.js';
	import { Info } from 'lucide-svelte';
	let { infoContent } = $props();
</script>

<i
	class="block w-fit py-2"
	use:addTippy={() => {
		return { content: infoContent, placement: 'right' };
	}}><Info /></i
>
