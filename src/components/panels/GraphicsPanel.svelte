<script>
  import { onMount, afterUpdate, tick, createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import { graphicFormVisible } from '../../stores/ui.store.js';
	import { newGraphic } from '../../stores/graphic.store.js';
	import Graphic from '../control/Graphic.svelte';

	const dispatch = createEventDispatcher();

	function showGraphicForm() {
		graphicFormVisible.set(true);
  }

  $: graphics = [];
</script>

<section class="panel">
	<header class="panel-header">
		<h3>Graphics</h3>
		<div class="header-right">
			<div class="add-graphic-button" on:click={showGraphicForm}>
				<PlusCircleIcon size="24" class="circle-icon" />
			</div>
		</div>
	</header>
	{#each graphics as graphic (graphic._id)}
		<div
			class="graphic-wrapper"
			animate:flip
			transition:fade={{ duration: 300 }}>
			<Graphic {graphic} key={graphic._id} />
		</div>
	{/each}
</section>

<style>
	.panel {
		left: 0;
		border-right: 1px solid var(--gray-900);
	}
	.panel-header h3 {
		margin: 0;
		padding: 0;
	}
	.add-graphic-button {
		color: var(--blue-700);
		cursor: pointer;
		transform-origin: 50% 50%;
		transform: scale(1);
		transition-property: all;
		transition-duration: 300ms;
	}
	.add-graphic-button:hover {
		color: var(--blue);
		transform: scale(1.1);
	}
	:global(.circle-icon) {
		padding: 0 !important;
		margin: 0 !important;
	}
</style>
