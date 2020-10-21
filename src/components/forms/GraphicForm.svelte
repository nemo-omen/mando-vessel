<script>
  import { slide, fly, fade } from 'svelte/transition';
	import { circInOut } from 'svelte/easing';
  import { XCircleIcon } from 'svelte-feather-icons';
  import {
		newGraphicOptions,
		optionsReset,
		newGraphic,
	} from '../../stores/graphic.store.js';
	import { graphicFormVisible } from '../../stores/ui.store.js';
	import { DynamicClass } from '../../models/dynamic.class.js';
	import CollapseSection from '../elements/CollapseSection.svelte';
	import GraphicOptionsForm from './GraphicOptionsForm.svelte';
	import BackdropForm from '../forms/BackdropForm.svelte';
	import BugForm from '../forms/BugForm.svelte';
	import CarouselForm from '../forms/CarouselForm.svelte';
	import FullscreenForm from '../forms/FullscreenForm.svelte';
	import LowerThirdForm from './LowerThirdForm.svelte';
	import OTSForm from '../forms/OTSForm.svelte';
	import PanelForm from '../forms/PanelForm.svelte';
	import SlateForm from '../forms/SlateForm.svelte';
	import TickerForm from '../forms/TickerForm.svelte';
  import TimerForm from '../forms/TimerForm.svelte';

	const graphicTypeSelections = [
		'Backdrop',
		'Bug',
		'Carousel',
		'Fullscreen',
		'Lower Third',
		'OTS',
		'Panel',
		'Slate',
		'Ticker',
		'Timer',
	];

	const showSelections = ['CVHP', 'LRR', 'Ram Talk', 'Derailed'];
	const sceneOptions = ['A01', 'AO2', 'A03', 'A04', 'A05', 'A06', 'A07'];

	let selectedGraphicType = '';
	let selectedShow = '';
	let selectedScene = '';

	function closeGraphicForm() {
		let reset = { ...optionsReset };
		newGraphicOptions.set({ ...reset });
		graphicFormVisible.set(false);
	}

	function selectGraphicType(event) {
		//update local graphic type variable
		selectedGraphicType = event.detail;
	}

	function selectShow(event) {
		//update local show variable
		selectedShow = event.detail;

		//update show option in newGraphicOptions store
		$newGraphic.show = selectedShow;
		console.log('$newGraphic after show selection: ', $newGraphic);
	}

	function selectScene(event) {
		selectedScene = event.detail;
		$newGraphic.scene = selectedScene;
		console.log('$newGraphic after scene selection: ', $newGraphic);
	}

	function saveGraphic() {
		Graphics.insert($newGraphic);
		graphicFormVisible.set(false);
	}
</script>

<section
	class="graphic-form"
	transition:fly={{ x: -1000, duration: 600, easing: circInOut }}>
	<header class="graphic-form-header">
		<h2>New Graphic</h2>
		<div class="header-right">
			<div
				class="header-icon-container"
				on:click={closeGraphicForm}
				in:fade={{ duration: 300, delay: 500 }}
				out:fade={{ duration: 200, easing: circInOut }}>
				<XCircleIcon size="36" class="close-sidebar-icon" />
			</div>
		</div>
	</header>
	<section class="graphic-form-body">
		<section class="graphic-form-left">
			<CollapseSection
				selections={graphicTypeSelections}
				title="Type"
				on:selectElement={selectGraphicType} />
			<CollapseSection
				selections={showSelections}
				title="Show"
				on:selectElement={selectShow} />
			<CollapseSection
				title="Scene"
				selections={sceneOptions}
				on:selectElement={selectScene} />
			{#if selectedGraphicType !== ''}
				<section
					class="subform-section"
					transition:fly={{ y: 2000, duration: 500, delay: 100 }}>
					{#if selectedGraphicType === 'Lower Third'}
						<LowerThirdForm on:saveGraphic={saveGraphic} />
					{/if}
					{#if selectedGraphicType === 'Bug'}
						<BugForm on:saveGraphic={saveGraphic} />
					{/if}
				</section>
			{/if}
		</section>
		<section class="graphic-form-right">
			<GraphicOptionsForm />
		</section>
	</section>
</section>

<style>
	.graphic-form {
		color: var(--gray-100);
		position: absolute;
		top: 6em;
		padding-top: 1em;
		right: 33.3%;
		bottom: 0;
		left: 0;
		background-color: var(--dark-gray-400);
		border-right: 1px solid var(--gray-900);
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: var(--gray-900) var(--dark-gray);
		z-index: 200;
	}
	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	::-webkit-scrollbar-thumb {
		background-color: var(--gray-900);
	}
	::-webkit-scrollbar-track {
		background-color: var(--dark-gray);
	}
	.graphic-form-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 1em;
	}
	.header-icon-container {
		color: var(--blue-700);
		cursor: pointer;
		transition-property: all;
		transition-duration: 300ms;
	}
	.header-icon-container:hover {
		color: var(--blue);
	}
	.graphic-form-body {
		display: grid;
		grid-template-columns: 50% 50%;
	}
	.graphic-form-left,
	.graphic-form-right {
		display: flex;
		flex-direction: column;
		padding: 0 1em;
	}
	.subform-section {
		margin: 0;
	}
</style>
