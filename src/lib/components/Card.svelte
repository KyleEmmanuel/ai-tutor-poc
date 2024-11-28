<script>
	import { addTippy } from '$lib/utils.js';
	let { imgSrc, title, summary, tooltip, onclickFn } = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="card cursor-pointer bg-base-100 shadow-xl transition-all hover:scale-105 hover:opacity-70"
	onclick={onclickFn}
	use:addTippy={() => {
		return { content: tooltip, placement: 'top' };
	}}
>
	<figure>
		<img src={imgSrc} alt={title} />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{summary}</p>
	</div>
</div>
