<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let value = false;
    export let label;

    function dispatchValue() {
        dispatch('setValue');
    }
</script>
<div class="switch-group">
    <h5>{label}</h5>
    <label class="switch">
        <input type="checkbox" bind:checked={value} on:change={dispatchValue}>
        <span class="slider"></span>
    </label>
</div>

<style>
    .switch-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
    }
    .switch {
        position: relative;
        display: inline-block;
        box-sizing: content-box;
        height: 26px;
        width: 50px;
    }
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid var(--gray-900);
        background-color: var(--dark-gray-700);
        transition-property: all;
        transition-duration: 400ms;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 0;
        bottom: 0;
        background-color: var(--gray-900);
        transition-property: all;
        transition-duration: 400ms;
    }
    input:checked + .slider {
        background-color: var(--blue-900);
        border: 1px solid var(--gray-800);
    }
    input:focus + .slider {
        box-shadow: 0 0 2px rgba(255, 255, 255, 0.3);
    }
    input:checked + .slider:before {
        transform: translateX(24px);
        background-color: var(--gray-800);
    }
    h5 {
        margin: 0;
        padding: 0;
        color: var(--gray-400);
    }
</style>