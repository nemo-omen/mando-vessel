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
    <a href="/">
		<div class="icon">
      <img src="mando.svg" alt="Mando" title="Mando (esp.) - control, command, remote control"/>
    </div>
    </a>
    <a href="/" title="Mando (esp.) - control, command, remote control"><h1 class="app-title">Mando</h1></a>
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
    height: 6em;
    display: flex;
    flex-direction: row;
    align-items: baseline;
		margin-bottom: 1em;
		background-color: var(--dark-gray-400);
		border-bottom: 1px solid var(--gray-900);
		padding: 1em;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
    z-index: 300;
  }
  .home-header a .icon {
    width: 4em;
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5em;
  }
  .icon img {
    width: 4em;
    height: 4em;
  }
  .home-header a {
    text-decoration: none;
    color: var(--amber);
  }
  .app-title {
    font-size: 4em;
    line-height: 1;
  }
	#home-content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin-top: 5em;
	}
</style>
