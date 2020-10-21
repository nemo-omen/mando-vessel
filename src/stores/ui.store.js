import { writable } from 'svelte/store';

export const graphicFormVisible = writable(false);

export const selectedGraphicType = writable('');

export const selectedGraphicStyle = writable('');