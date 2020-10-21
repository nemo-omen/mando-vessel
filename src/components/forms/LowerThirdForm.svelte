<script>
	import {
		onMount,
		beforeUpdate,
		afterUpdate,
		createEventDispatcher,
	} from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { circInOut } from 'svelte/easing';
	import { PlusCircleIcon, MinusCircleIcon } from 'svelte-feather-icons';
	import { LowerThird } from '../../models/graphic.model.js';
	import {
		newGraphicOptions,
		newGraphic,
	} from '../../stores/graphic.store.js';
	import { graphicFormVisible } from '../../stores/ui.store.js';

	const dispatch = createEventDispatcher();

	let subjectCounter = 1;
	$: subjects = [];

	let subjectPrototype = {
		title: '',
		info: '',
	};

	function addSubject() {
		if (subjectCounter <= 4) {
			subjects = [...subjects, { ...subjectPrototype }];
		}
		subjectCounter++;
	}

	function removeSubject() {
		if (subjectCounter > 1) {
			let replacementSubjects = [...subjects];
			replacementSubjects.pop();
			subjects = [...replacementSubjects];
		}
		subjectCounter--;
	}

	function updateSubjects() {
		$newGraphic.subjects = [...subjects];
	}

	function cancel() {
		newGraphic.set({});
		graphicFormVisible.set(false);
	}

	function save() {
		dispatch('saveGraphic');
	}

	onMount(() => {
		addSubject();
		newGraphic.set(
			new LowerThird({
				subjects: [],
				scene: $newGraphicOptions.scene,
				show: $newGraphicOptions.show,
			}),
		);
	});
</script>

<section
	class="lower-third"
	out:fade={{ duration: 400 }}
	in:fly={{ x: -2000, delay: 400, duration: 400 }}>
	{#each subjects as subject, index (subject)}
		<div class="subject-form-container" transition:slide={{ duration: 300 }}>
			<h4 class="subject-title">Subject {index + 1}</h4>
			<div class="subject-form-group">
				<input
					type="text"
					bind:value={subjects[index].title}
					on:change={updateSubjects}
					placeholder="Title" />
				<input
					type="text"
					bind:value={subjects[index].info}
					placeholder="Info"
					on:change={updateSubjects} />
			</div>
		</div>
	{/each}
	<div class="subject-group-control">
		<div
			class={subjects.length > 1 ? 'subject-button active' : 'subject-button inactive'}
			on:click={subjects.length > 1 ? removeSubject : null}>
			<MinusCircleIcon size="36" />
		</div>
		<div
			class={subjects.length < 4 ? 'subject-button active' : 'subject-button inactive'}
			on:click={subjects.length < 4 ? addSubject : null}>
			<PlusCircleIcon size="36" />
		</div>
	</div>
	<div class="submit-group">
		<button class="cancel-button" on:click={cancel}>Cancel</button>
		<button class="save-button" on:click={save}>Save</button>
	</div>
</section>

<style>
	.lower-third {
		display: flex;
		flex-direction: column;
		margin: 1em 0;
	}

	.subject-title {
		margin-bottom: 1em;
		font-weight: 300;
	}

	.subject-form-group {
		display: flex;
		flex-direction: row;
		padding: 0;
		margin-bottom: 1em;
		gap: 1em;
	}

	.subject-form-group input[type='text'] {
		margin: 0;
	}

	.subject-group-control {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		gap: 1em;
		overflow: hidden;
	}

	:global(.subject-button) {
		cursor: pointer;
		transition-property: all;
		transition-duration: 300ms;
	}

	:global(.active) {
		color: var(--blue-700);
	}

	:global(.active:hover) {
		color: var(--blue);
	}
	:global(.inactive) {
		color: var(--gray-900);
		cursor: default;
	}
</style>
