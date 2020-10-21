<script>
	import { sineInOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	import { XSquareIcon } from 'svelte-feather-icons';

	const dispatch = createEventDispatcher();

	export let buttonValue;
	export let selected;
	export let color = 'blue';

	function toggleSelected() {
		if (!selected) {
			dispatch('selectButton', { selected: buttonValue });
		} else {
			dispatch('selectButton', { selected: '' });
		}
	}
</script>

<button
	class={selected ? color + '-selected' : color}
	on:click={toggleSelected}
	value={buttonValue}>
	{buttonValue}
</button>

<style>
	button {
		font-size: 1rem;
		border: none;
		padding: 0.5rem;
		margin: 0;
		color: var(--blue);
		background-color: var(--dark-gray);
		cursor: pointer;
		transition-property: all;
		transition-duration: 300ms;
		border: none;
	}
	button:focus,
	button:active {
		outline: none;
		border: none;
	}
	button:hover {
		color: var(--dark-gray);
		border: none;
	}
	.amber,
	.red,
	.blue {
		color: var(--blue);
		background-color: var(--dark-gray);
	}
	.amber:active,
	.blue:active,
	.red:active {
		color: var(--dark-gray);
	}
	.amber-selected,
	.amber:active,
	.amber:hover {
		color: var(--dark-gray);
		background-color: var(--amber-800);
	}
	.red-selected,
	.red:active,
	.red:hover {
		color: var(--dark-gray);
		background-color: var(--red-800);
	}
	.blue-selected,
	.blue:active,
	.blue:hover {
		color: var(--dark-gray);
		background-color: var(--blue-800);
	}
</style>
