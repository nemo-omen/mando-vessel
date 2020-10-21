<script>
	import { graphicFormVisible } from '../../stores/ui.store.js';
	import {
		newGraphicOptions,
		optionsReset,
	} from '../../stores/graphic.store.js';

	function handlePanelClick() {
		if ($graphicFormVisible === true) {
			let reset = { ...optionsReset };
			newGraphicOptions.set({ ...reset });
			graphicFormVisible.set(false);
		}
	}
</script>

<section class="panel" on:click|stopPropagation={handlePanelClick}>
	<header class="panel-header">
		<h3>OBS</h3>
	</header>
</section>

<style>
	.panel {
		position: absolute;
		width: 33.3%;
		right: 0%;
		top: 5em;
		bottom: 0;
	}
</style>
