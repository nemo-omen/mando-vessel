<script>
	import { fade, fly, slide } from 'svelte/transition';
	import { newGraphic } from '../../stores/graphic.store.js';
	import Preview from '../elements/Preview.svelte';
	import AnimationForm from './AnimationForm.svelte';
	import CollapseSection from '../elements/CollapseSection.svelte';
	import Range from '../elements/Range.svelte';
	import Switch from '../elements/Switch.svelte';

	//looping values
	let loop = false;
	let activeSeconds = 7;
	$: activeTimeout = activeSeconds * 1000;
	let inactiveSeconds = 60;
	$: inactiveTimeout = inactiveSeconds * 1000;

	function setEntranceAnimation(event) {
		$newGraphic.entranceAnimation = {...event.detail};
	}

	function setExitAnimation(event) {
		$newGraphic.exitAnimation = {...event.detail};
	}

	function setLoop() {
		$newGraphic.playOptions.loop = loop;
		setOnscreenDuration();
		setOffScreenDuration();
	}

	function setOnscreenDuration() {
		$newGraphic.playOptions.onScreen = activeTimeout;
	}

	function setOffScreenDuration() {
		$newGraphic.playOptions.offScreen = inactiveTimeout;
	}

</script>

{#if $newGraphic !== null}
	<section class="graphic-options" transition:fly={{ y: 2000, duration: 500 }}>
		<Preview />
		<div class="animation-control" id="entrance">
			<div class="animation-control-group">
				<h5 class="animation-option-label">Entrance Animation</h5>
				<AnimationForm on:setAnimationProperty={setEntranceAnimation} />
			</div>
			<div class="animation-control-group" id="exit">
				<h5 class="animation-option-label">Exit Animation</h5>
				<AnimationForm on:setAnimationProperty={setExitAnimation} />
			</div>
		</div>
		<div class="repeat-group">
			<div class="switch-container">
				<Switch label="Repeat" bind:value={loop} on:setValue={setLoop} />
			</div>
				{#if loop === true}
				<div class="loop-interval-group" transition:slide={{duration:400}}>
					<Range
						label="Onscreen"
						highlight={activeSeconds < 60 ? activeSeconds + 's' : parseInt((activeSeconds / 60)) + 'm'}
						name="animation-delay"
						id="animation-delay"
						bind:value={activeSeconds}
						max={1800}
						step="1"
						on:sliderUpdate={setOnscreenDuration} />
					<Range
						label="Offscreen"
						highlight={inactiveSeconds < 60 ? inactiveSeconds + 's' : parseInt((inactiveSeconds / 60)) + 'm'}
						name="animation-delay"
						id="animation-delay"
						bind:value={inactiveSeconds}
						max={1800}
						step="1"
						on:sliderUpdate={setOffScreenDuration} />
				</div>
				{/if}
		</div>
	</section>
{/if}

<style>
	.graphic-options {
		display: flex;
		flex-direction: column;
	}

	.animation-control {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--gray-800);
		margin-top: 1em;
	}

	.animation-control-group {
		flex-grow: 1;
		padding: 0;
	}
	#exit {
		border-top: 1px solid var(--gray-900);
	}
	h5.animation-option-label {
		margin: 1em;
		padding: 0;
		color: var(--gray-300) !important;
		/* font-weight: 300; */
	}
	.repeat-group {
        display: flex;
        flex-direction: column;
		margin-top: 1em;
		padding: 1em;
		border: 1px solid var(--gray-800);
    }
	.loop-interval-group {
		margin-top: 1em;
	}
</style>
