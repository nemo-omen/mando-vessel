import {readable, writable, derived} from 'svelte/store';
import { DynamicClass } from '../models/dynamic.class.js';

export const newGraphicOptions = writable({
    show: null, //updated in GraphicsForm.svelte
    scene: null, //updated in GraphicOptionsForm.svelte
});

export const optionsReset = readable({
    show: null, //updated in GraphicsForm.svelte
    scene: null, //updated in GraphicOptionsForm.svelte
});

export const newGraphic = writable(null);