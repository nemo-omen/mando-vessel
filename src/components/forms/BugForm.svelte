<script>
	import { createEventDispatcher, onMount, beforeUpdate } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import {
		newGraphicOptions,
		newGraphic,
	} from '../../stores/graphic.store.js';
	import { graphicFormVisible } from '../../stores/ui.store.js';
	import { Bug } from '../../models/graphic.model.js';
	import SelectSegmentList from '../elements/SelectSegmentList.svelte';

	const dispatch = createEventDispatcher();

	let textContent = '';
	let bugType = 'Text';

	function setBugType(event) {
		bugType = event.detail;
	}

	function updateGraphicContent() {
		$newGraphic.content = textContent;
		console.log('$newGraphic: ', $newGraphic);
	}

	function saveGraphic() {
		dispatch('saveGraphic');
	}

	function cancel() {
		newGraphic.set({});
		graphicFormVisible.set(false);
	}

	onMount(() => {
		newGraphic.set(
			new Bug({
				bugType: bugType,
				content: textContent,
				scene: $newGraphicOptions.scene,
				show: $newGraphicOptions.show,
			}),
		);
	});
</script>

<section class="subform">
	<SelectSegmentList
		selections={['Image', 'Text']}
		on:setSelection={setBugType}
		justify="flex-end" />
	{#if bugType === 'Text'}
		<div
			class="input-container"
			in:fly={{ y: 2000, duration: 500, delay: 400 }}
			out:fade={{ duration: 400 }}>
			<h4 class="label">Bug Text</h4>
			<input
				type="text"
				name="content"
				id="content"
				placeholder="Text"
				bind:value={textContent}
				on:change={updateGraphicContent} />
		</div>
	{/if}
	<div class="submit-group" in:fade={{ duration: 500, delay: 800 }}>
		<button class="cancel-button" on:click={cancel}>Cancel</button>
		<button class="save-button" on:click={saveGraphic}>Save</button>
	</div>
</section>

<style>
	.subform {
		margin-top: 1em;
		padding: 0;
	}
	.label {
		margin-bottom: 1em;
		font-weight: 300;
	}
	.input-container {
		display: flex;
		flex-direction: column;
	}
</style>
