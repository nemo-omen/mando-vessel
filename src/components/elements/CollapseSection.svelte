<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, crossfade } from 'svelte/transition';
	import SelectButton from './SelectButton.svelte';
	import Icon from './Icon.svelte';
	import Collapse from './Collapse.svelte';

	const dispatch = createEventDispatcher();

	export let active = true;
	export let title = '';
	export let selections = [];

	let selected;

	function selectElement(event) {
		selected = event.detail.selected;
		setTimeout(() => {
			active = false;
		}, 200);
		dispatch('selectElement', selected);
	}
</script>

<Collapse bind:open={active}>
	<header class="form-header" slot="trigger">
		<h3>{title}</h3>
		<div class="header-right">
			{#if selected !== undefined}
				<h4 class="selected" transition:fade|local={{ duration: 200 }}>
					{selected}
				</h4>
			{/if}
			<Icon name="chevron" direction={active ? 'n' : 'e'} />
		</div>
	</header>
	<div class="select-segment">

		{#each selections as selection, index}
			<SelectButton
				buttonValue={selection}
				on:selectButton={selectElement}
				selected={selected === selection ? true : false} />
		{/each}
	</div>
</Collapse>

<style>
	.form-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: var(--gray-200);
		font-size: 1.5em;
		padding: 0;
		border-bottom: 1px solid var(--dark-gray-200);
	}
	.form-header h3 {
		font-weight: 300;
		padding: 0;
		margin: 0.5em 0;
	}
	.header-right {
		display: flex;
		flex-direction: row;
		justify-content: end;
		align-items: center;
		gap: 1em;
	}
	.form-header h4 {
		font-size: 1.25rem;
		font-weight: 300;
		padding: 0;
		margin: 0.5em 0;
	}
	.selected {
		color: var(--blue-600);
	}
	.select-segment {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		flex-wrap: wrap;
		background-color: var(--dark-gray);
		border-bottom: 1px solid var(--gray-900);
		font-size: 1rem;
		padding: 0;
	}
</style>
