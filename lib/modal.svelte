<script context="module">
	let onTop; //keeping track of which open modal is on top
	const modals = {}; //all modals get registered here for easy future access

	// 	returns an object for the modal specified by `id`, which contains the API functions (`open` and `close` )
	export function getModal(id = '') {
		return modals[id];
	}
</script>

<script>
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let topDiv;
	let visible = false;
	let prevOnTop;
	let closeCallback;

	export let id = '';

	function keyPress(ev) {
		//only respond if the current modal is the top one
		if (ev.key == 'Escape' && onTop == topDiv) close(); //ESC
	}

	/**  API **/
	function open(callback) {
		if (browser) {
			closeCallback = callback;
			if (visible) return;
			prevOnTop = onTop;
			onTop = topDiv;
			window.addEventListener('keydown', keyPress);

			//this prevents scrolling of the main window on larger screens
			document.body.style.overflow = 'hidden';

			visible = true;
			//Move the modal in the DOM to be the last child of <BODY> so that it can be on top of everything
			document.body.appendChild(topDiv);
		}
	}

	function close(retVal) {
		if (browser) {
			if (!visible) return;
			window.removeEventListener('keydown', keyPress);
			onTop = prevOnTop;
			if (onTop == null) document.body.style.overflow = '';
			visible = false;
			if (closeCallback) closeCallback(retVal);
		}
	}

	//expose the API
	modals[id] = { open, close };

	onDestroy(() => {
		if (browser) {
			delete modals[id];
			window.removeEventListener('keydown', keyPress);
		}
	});
</script>

<div class="overlay" class:visible bind:this={topDiv} on:click={() => close()}>
    <div class="box" on:click|stopPropagation={() => {}}>
        <slot /> 
    </div>
</div>

<style>
	.overlay {
		visibility: hidden;

		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #4448;
		
        display: flex;
		align-items: center;
		justify-content: center;
	}

    .visible {
		visibility: visible !important;
	}

	.box {
        box-shadow: 0 2px 4px 0 #434343;
		border-radius: 8px;
		background: white;
		padding: 1.2em;
        width: 45%;
	}
</style>
