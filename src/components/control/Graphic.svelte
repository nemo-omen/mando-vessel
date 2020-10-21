<script>
	import { beforeUpdate, afterUpdate, onMount, tick } from 'svelte';
	// import LowerThird_Preview from '../preview/LowerThird_Preview.svelte';
	// import Bug_Preview from '../preview/Bug_Preview.svelte';

	export let graphic;

	let graphicTypeValue = graphic.type;
	let isEditing = false;
	let inputElement;

	let isPlaying = false;
	$: playout = useTracker(() => Playout.find({}).fetch());

	function deleteGraphic() {
		Graphics.remove(graphic._id);
	}

	function toggleEdit() {
		isEditing = !isEditing;
	}

	function play() {
		isPlaying = !isPlaying;
		console.log(isPlaying);
		if (isPlaying === true) {
			let playingGraphic = { ...graphic, playing: true };
			console.log('Play gfx.');
			Playout.insert(playingGraphic);
			emitPlay(playingGraphic);
		} else {
			console.log('Take gfx down.');
			Playout.remove(graphic._id);
		}
	}

	function checkPlaying() {
		let isPlayingCurrent = Playout.findOne(graphic._id);
		if (isPlayingCurrent !== undefined) {
			isPlaying = true;
		} else {
			isPlaying = false;
		}
	}

	onMount(() => {
		checkPlaying();
	});
	beforeUpdate(() => {
		checkPlaying();
	});
</script>

<article class="graphic-item" class:active={isPlaying}>
	<header class="graphic-item-header">
		<div class="header-left">
			<h4>{graphic.show}</h4>
			<h4>{graphic.scene}</h4>
			<h4>{graphic.type}</h4>
		</div>
		<div class="header-right">
			<button on:click|stopPropagation={deleteGraphic}>Delete</button>
			<button on:click={toggleEdit}>Edit</button>
			<button on:click={play}>Play</button>
		</div>
	</header>
	<section class="graphic-item-body">
		<!-- {#if graphic.type === 'Lower Third'}
			<LowerThird_Preview {graphic} />
		{:else if graphic.type === 'Bug'}
			<Bug_Preview {graphic} />
		{/if} -->
	</section>
</article>

<style>
	.graphic-item {
		display: flex;
		flex-direction: column;
		margin: 0.5em;
		border: 1px solid var(--gray-900);
	}
	.graphic-item-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0.5em;
		background-color: var(--dark-gray-400);
		border-bottom: 1px solid var(--gray-900);
		transition-property: 'background-color';
		transition-duration: 300ms;
	}
	.graphic-item-header button {
		outline: none;
	}
	.active header {
		background-color: var(--blue-900);
	}
	.active header button {
		background-color: var(--blue-900);
		color: var(--dark-gray-900);
		border: 1px solid var(--blue-900);
		outline: none;
	}
	.active header button:hover {
		background-color: var(--blue);
	}
	.header-left {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-right: 5em;
	}
	h4:hover {
		text-decoration: underline;
	}
</style>
