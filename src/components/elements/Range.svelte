<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let label = '';
	export let highlight = '';
	export let value = 0;
	export let max = 2000;
	export let step = 1;
	export let name = '';
	export let id = '';

	function change() {
		dispatch('sliderUpdate', value);
	}

	// function input() {
	// 	dispatch('input', value);
	// }
</script>

<div class="range-group">
	<div class="range-group-label">
		<h5 for={name}>{label}</h5>
		<h5 class="highlight">{highlight}</h5>
	</div>
	<input type="range" bind:value on:change={change} {max} {step} {name} {id} />
</div>

<style>
	/* label {
		margin-right: 1em;
	} */
	.highlight {
		color: var(--blue);
		margin-left: 1em;
	}
	.range-group {
		display: grid;
		grid-template-columns: 30% 70%;
		gap: 1em;
		flex-grow: 1;
		padding: 0.5em 1em 0 0;
	}
	.range-group-label {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0;
		padding: 0;
	}
	.range-group-label h5 {
		margin: 0;
		padding: 0;
		font-weight: 300;
	}
	input[type='range'] {
		width: 100%;
		-webkit-appearance: none;
		background: transparent;
	}
	input[type='range']::webkit-slider-thumb {
		-webkit-appearance: none;
	}
	input[type='range']:focus {
		outline: none;
		border: transparent;
	}
	input[type='range']::-ms-track {
		/* width: 100%; */
		cursor: pointer;
		background: transparent;
		color: transparent;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 1.75em;
		width: 0.6em;
		background: var(--gray-800);
		border-radius: 0;
		border: none;
		cursor: pointer;
		margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
	}

	/* All the same stuff for Firefox */
	input[type='range']::-moz-range-thumb {
		height: 1.75em;
		width: 0.6em;
		background: var(--gray-800);
		border-radius: 0;
		border: none;
		cursor: pointer;
	}

	/* All the same stuff for IE */
	input[type='range']::-ms-thumb {
		height: 1.75em;
		width: 0.6em;
		background: var(--gray-800);
		border-radius: 0;
		border: none;
		cursor: pointer;
	}

	input[type='range']::-webkit-slider-runnable-track {
		/* width: 100%; */
		height: 4px;
		cursor: pointer;
		background: var(--dark-gray-700);
	}

	input[type='range']:focus::-webkit-slider-runnable-track {
		background: var(--dark-gray-700);
	}

	input[type='range']::-moz-range-track {
		/* width: 100%; */
		height: 4px;
		cursor: pointer;
		background: var(--dark-gray-700);
	}

	input[type='range']::-ms-track {
		/* width: 100%; */
		height: 4px;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		border-width: 14px 0;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background: var(--dark-gray-700);
	}
	input[type='range']:focus::-ms-fill-lower {
		background: var(--dark-gray-700);
	}
	input[type='range']::-ms-fill-upper {
		background: var(--dark-gray-700);
	}
	input[type='range']:focus::-ms-fill-upper {
		background: var(--dark-gray-700);
	}
</style>
