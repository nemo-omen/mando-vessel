<script>
    import {fade, fly, slide} from 'svelte/transition';
    import { circInOut } from 'svelte/easing';
	import {
		BoldIcon,
		ItalicIcon,
		AlignLeftIcon,
		AlignCenterIcon,
		AlignRightIcon,
		TypeIcon,
    } from 'svelte-feather-icons';
    import { newGraphicOptions, newGraphic } from '../../stores/graphic.store.js';

	let horizontalSectors = ['left', 'middle', 'right'];
	let verticalSectors = ['top', 'center', 'bottom'];

	// formatting option variables
	let weight = 'medium';
	let style = 'normal';
	let align = 'left';

	let bold = false;
	let italic = false;
	let alignLeft = true;
	let alignCenter = false;
	let alignRight = false;

	function setGraphicPosition(points) {
        $newGraphic.position = [...points];
	}

	function toggleBold() {
		bold = !bold;
		weight = bold ? 'bold' : 'medium';
		$newGraphic.fontWeight = weight;
	}

	function toggleItalic() {
		italic = !italic;
		style = italic ? 'italic' : 'normal';
		$newGraphic.fontStyle = style;
	}

	function setAlignment(alignment) {
		switch (alignment) {
			case 'alignLeft':
				alignLeft = true;
				alignCenter = false;
				alignRight = false;
				$newGraphic.textAlign = 'left';
				break;
			case 'alignCenter':
				alignLeft = false;
				alignCenter = true;
				alignRight = false;
				$newGraphic.textAlign = 'center';
				break;
			case 'alignRight':
				alignLeft = false;
				alignCenter = false;
				alignRight = true;
				$newGraphic.textAlign = 'right';
				break;
		}
	}

	function changeFontSize(change) {
		switch (change) {
			case 'increase':
				$newGraphic.fontSize += 0.5;
				break;
			case 'decrease':
				$newGraphic.fontSize -= 0.5;
				break;
		}
	}
</script>
{#if $newGraphic !== null}
<section class="static-preview">
    {#if $newGraphic.type === 'Timer' || $newGraphic.type === 'Fullscreen'}
	<header class="static-preview-header" in:slide={{duration: 200, easing: circInOut}} out:slide={{duration: 200,delay: 200, easing: circInOut}}>
		<div
			class={bold === true ? 'format-button format-button-selected' : 'format-button'}
			on:click={toggleBold} in:fade={{duration: 200, delay: 200}} out:fade={{duration:200}}>
			<BoldIcon size="24" />
		</div>
		<div
			class={italic === true ? 'format-button format-button-selected' : 'format-button'}
			on:click={toggleItalic} in:fade={{duration: 200, delay: 200}} out:fade={{duration:200}}>
			<ItalicIcon size="24" />
		</div>
		<div
			class={alignLeft === true ? 'format-button format-button-selected' : 'format-button'}
			on:click={() => setAlignment('alignLeft')} in:fade={{duration: 200, delay: 200}} out:fade={{duration:200}}>
			<AlignLeftIcon size="24" />
		</div>
		<div
			class={alignCenter === true ? 'format-button format-button-selected' : 'format-button'}
			on:click={() => setAlignment('alignCenter')} in:fade={{duration: 200, delay: 200}} out:fade={{duration:200}}>
			<AlignCenterIcon size="24" />
		</div>
		<div
			class={alignRight === true ? 'format-button format-button-selected' : 'format-button'}
			on:click={() => setAlignment('alignRight')} in:fade={{duration: 200, delay: 200}} out:fade={{duration:200}}>
			<AlignRightIcon size="24" />
		</div>
		<div class="format-button" on:click={() => changeFontSize('increase')} in:fade={{duration: 200, delay: 200}} out:fade={{duration:200}}>
			<TypeIcon size="24" />
		</div>
		<div class="format-button" on:click={() => changeFontSize('decrease')} in:fade={{duration: 200, delay: 200}} out:fade={{duration:200}}>
			<TypeIcon size="18" />
		</div>
    </header>
    {/if}
    <div class="preview-container" style="--aspect-ratio: 16/9 !important;">
		<div class="preview-wrapper">
            <div class="preview">
				<!-- <div
					class={'preview-render ' + verticalSectors[previewGraphic.position[0] - 1] + '-' + horizontalSectors[previewGraphic.position[1] - 1]}>
					<article class="preview-graphic">
						<Timer bind:graphic={previewGraphic} />
					</article>
				</div> -->
				<div
					class="quadrant top left"
					on:click={() => setGraphicPosition([1, 1])} />
				<div
					class="quadrant top middle"
					on:click={() => setGraphicPosition([1, 2])} />
				<div
					class="quadrant top right"
					on:click={() => setGraphicPosition([1, 3])} />
				<div
					class="quadrant center left"
					on:click={() => setGraphicPosition([2, 1])} />
				<div
					class="quadrant center middle"
					on:click={() => setGraphicPosition([2, 2])} />
				<div
					class="quadrant center right"
					on:click={() => setGraphicPosition([2, 3])} />
				<div
					class="quadrant bottom left"
					on:click={() => setGraphicPosition([3, 1])} />
				<div
					class="quadrant bottom middle"
					on:click={() => setGraphicPosition([3, 2])} />
				<div
					class="quadrant bottom right"
					on:click={() => setGraphicPosition([3, 3])} />
			</div>
		</div>
	</div>
</section>
{/if}

<style>
	.preview {
		position: relative;
		min-height: 100%;
		/* border: 1px solid var(--indigo-900); */
		background-color: var(--dark-gray-900);
		padding: 0;
    }

	/* .preview-render {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		flex-direction: row;
		padding: 1em;
	}
	.preview-graphic {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	} */
	.preview .quadrant {
		position: absolute;
		width: 33.33%;
		height: 33.33%;
		transition-property: all;
		transition-duration: 300ms;
		box-sizing: border-box;
        background-color: var(--dark-gray-900-alpha-0);
        border-color: var(--indigo-900);
		margin: 0;
	}
	.preview .quadrant:hover {
        background-color: var(--dark-gray-100-alpha-5);
    }
    .preview .quadrant:active {
        background-color: var(--gray-900-alpha-5);
    }
	.left {
		left: 0;
		border-right: 1px dashed var(--indigo-900);
	}
	.right {
		right: 0;
		border-left: 1px dashed var(--indigo-900);
	}
	.middle {
		left: 33.33%;
		right: 33.33%;
	}
	.top {
		top: 0;
		border-bottom: 1px dashed var(--indigo-900);
	}
	.center {
		top: 33.33%;
		bottom: 33.33%;
	}
	.bottom {
		bottom: 0;
		border-top: 1px dashed var(--indigo-900);
	}

	[style*='--aspect-ratio'] > :first-child {
		width: 100%;
	}
	@supports (--custom: property) {
		[style*='--aspect-ratio'] {
			position: relative;
		}
	}
	[style*='--aspect-ratio']::before {
		content: '';
		display: block;
		padding-bottom: calc(100% / (var(--aspect-ratio)));
	}
	[style*='--aspect-ratio'] > :first-child {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
	}

	/* .top-left {
		align-items: flex-start;
		justify-content: flex-start;
	}
	.top-middle {
		align-items: flex-start;
		justify-content: center;
	}
	.top-right {
		align-items: flex-start;
		justify-content: flex-end;
	}
	.center-left {
		align-items: center;
		justify-content: flex-start;
	}
	.center-middle {
		align-items: center;
		justify-content: center;
	}
	.center-right {
		align-items: center;
		justify-content: flex-end;
	}
	.bottom-left {
		align-items: flex-end;
		justify-content: flex-start;
	}
	.bottom-middle {
		align-items: flex-end;
		justify-content: center;
	}
	.bottom-right {
		align-items: flex-end;
		justify-content: flex-end;
	} */

	.static-preview {
		margin-top: 1rem;
		border: 1px solid var(--gray-900);
	}
	.static-preview-header {
		display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--gray-900);
        /* border-bottom: none; */
		/* align-items: baseline; */
	}
	/* .static-preview-body {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	} */
	.format-button {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		padding: 0.25rem;
	}
	.format-button:hover {
		background-color: var(--gray-800);
	}
	.format-button:active {
		background-color: var(--gray-700);
		color: var(--dark-gray-700);
	}
	:global(.format-button-selected) {
		background-color: var(--gray-700);
		color: var(--dark-gray-700);
	}
</style>
