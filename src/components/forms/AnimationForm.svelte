<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { newGraphicOptions } from '../../stores/graphic.store.js';
	import SelectSegmentList from '../elements/SelectSegmentList.svelte';
    import Range from '../elements/Range.svelte';
	import Switch from '../elements/Switch.svelte';

	const dispatch = createEventDispatcher();

	let animationTypes = ['Fade', 'Fly', 'Slide', 'Scale', 'Swing'];
	let animationDirections = ['Top', 'Bottom', 'Left', 'Right'];
    let scaleDirections = ['Top', 'Bottom', 'Center', 'Left', 'Right'];

	let animationType = null;
	let animationDirection = null;
	let animationDuration = 500; //this matches the pre-set duration in /imports/stores/GraphicStore.js
	let animationDelay = 0;

	let animationObject = {
		animationType: animationType,
		animationDirection: animationDirection,
		animationDuration: animationDuration,
		animationDelay: animationDelay,
	};

	//animation types to exclude from triggering the animationDirection select list
	let noDirectionTypes = [null, 'Fade'];

	function setAnimationType(event) {
		animationType = event.detail;
		animationObject.animationType = animationType;
		dispatchAnimationObject(animationObject);
	}

	function setAnimationDirection(event) {
		animationDirection = event.detail;
		animationObject.animationDirection = animationDirection;
		dispatchAnimationObject(animationObject);
	}
	function setAnimationDuration(event) {
		animationDuration = event.detail;
		animationObject.animationDuration = animationDuration;
		dispatchAnimationObject(animationObject);
	}
	function setAnimationDelay(event) {
		animationDelay = event.detail;
		animationObject.animationDelay = animationDelay;
		dispatchAnimationObject(animationObject);
	}

	function dispatchAnimationObject(object) {
		dispatch('setAnimationProperty', {...object});
	}

</script>

<div class="animation-selection-list">
	<SelectSegmentList
		selections={animationTypes}
		on:setSelection={setAnimationType} />
</div>
{#if animationType === 'Scale'}
<div class="animation-selection-list" transition:slide={{ duration: 300 }}>
    <SelectSegmentList
        selections={scaleDirections}
        on:setSelection={setAnimationDirection} />
</div>
{:else}
    {#if !noDirectionTypes.includes(animationType)}
        <div class="animation-selection-list" transition:slide={{ duration: 300 }}>
            <SelectSegmentList
                selections={animationDirections}
                on:setSelection={setAnimationDirection} />
        </div>
    {/if}
{/if}
<!-- Values for the Range components should be binded to a value somewhere in the script -->
<!-- I may set up event dispatchers later, for now, binding seems to work best for what I need -->
<div class="range-group">
<Range
	label="Duration"
	highlight={animationDuration + 'ms'}
	name="animation-duration"
	id="animation-duration"
	bind:value={animationDuration}
	on:sliderUpdate={setAnimationDuration}
	max="1000"
    step="1" />

    <Range
        label="Delay"
        highlight={animationDelay + 'ms'}
        name="animation-delay"
        id="animation-delay"
		bind:value={animationDelay}
		on:sliderUpdate={setAnimationDelay}
        max={1000}
        step="1" />
</div>

<style>
	.animation-selection-list {
		margin-bottom: 0.5rem;
		overflow: hidden;
		background-color: var(--dark-gray);
	}
    .range-group {
        padding: 0 1em 1em 1em;
    }

</style>
