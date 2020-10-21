<script>
  import { graphicFormVisible } from '../stores/ui.store.js';
  import { newGraphicOptions, optionsReset } from '../stores/graphic.store.js';
	import GraphicsPanel from '../components/panels/GraphicsPanel.svelte';
	import ScenesPanel from '../components/panels/ScenesPanel.svelte';
	import ObsPanel from '../components/panels/ObsPanel.svelte';
	import GraphicForm from '../components/forms/GraphicForm.svelte';
  import Graphic from '../components/control/Graphic.svelte';

  	function handleHeaderClick() {
		if ($graphicFormVisible === true) {
			let reset = { ...optionsReset };
			newGraphicOptions.set({ ...reset });
			graphicFormVisible.set(false);
		}
	}

</script>

<div id="home">
	<header class="home-header" on:click|stopPropagation={handleHeaderClick}>
		<h1>Mando</h1>
	</header>
	<section id="home-content">
		<GraphicsPanel />
		<ScenesPanel />
		<ObsPanel />
	</section>
</div>

{#if $graphicFormVisible === true}
	<div id="graphic-form-container">
		<section class="graphic-form-container">
			<GraphicForm />
		</section>
	</div>
{/if}

<style>
	#home {
		/* position: relative;
		width: 100%;
		height: 100%; */
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: var(--dark-gray-300);
		color: var(--gray-100);
	}
	.home-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 5em;
		margin-bottom: 1em;
		background-color: var(--dark-gray-400);
		border-bottom: 1px solid var(--gray-900);
		padding: 1em;
		box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
	}
	#home-content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin-top: 5em;
	}
</style>
