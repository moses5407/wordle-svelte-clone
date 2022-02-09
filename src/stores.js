import { writable } from 'svelte/store';
import words from "./words";

// for possible messages
export const message = writable(false);

// How many columns will it consist of
export const cols = writable(5);

// How many lines will it consist of
export const rows = writable(6);

// on which line
export const current = writable(0);

// all words
export const allWords = writable(words)

// chosen random word
export const randomWord = writable(words[5][Math.floor(Math.random() * words[5].length)].split(''))

// written words
export const currentWords = writable([]);

// current word typed
export const currentWord = writable([]);

// open mode
export const lightMode = writable(false)

export const modal = writable(false)

export const win = writable(false)
export const lose = writable(false)
