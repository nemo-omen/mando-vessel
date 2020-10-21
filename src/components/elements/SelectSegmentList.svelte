<script>
	import { fly, scale } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	import SelectButton from './SelectButton.svelte';

	const dispatch = createEventDispatcher();

	export let selections = [];
	export let color = 'blue';
	export let margin = 0;
	export let padding = 0;
	export let hoverIcon = false;
	export let justify = 'space-between';
	export let gap = '0em';
	let selected = '';

	function selectElement(event) {
		selected = event.detail.selected;
		dispatch('setSelection', selected);
	}
</script>

<section
	class={'select-segment ' + ' margin-' + margin + ' padding-' + padding}
	style={'justify-content: ' + justify + '; gap: ' + gap + ';'}>
	{#each selections as selection, index}
		<SelectButton
			buttonValue={selection}
			on:selectButton={selectElement}
			selected={selected === selection ? true : false}
			{color} />
	{/each}
</section>

<style>
	.select-segment {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		/* justify-content: space-between; */
		align-items: center;
		font-size: 1rem;
		/* padding: 0 1em; */
		margin: 0;
		/* gap: 0.25rem; */
	}
	.margin-h-1 {
		margin: 1rem 0;
	}
	.padding-1 {
		padding: 1rem;
	}
</style>
