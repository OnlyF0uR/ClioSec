<slot />

<style>
	:root {
		--dark-blue-colour: #212735;
		--blue-colour: #2a2f42;
		--blue-variant-colour: #3b4680;
		--light-blue-colour: #8bb5db;

		--light-grey-text-colour: #9ea3b4;
		--grey-text-colour: #646977;

		--main-colour: #587983;

		/* Icon-colour etc. */
		--light-red-colour: #d65551;
		--red-colour: #eb3731;
		--green-colour: #0cb403;
		--dark-grey-colour: darkslategray;

		/* Highlight */
		--dark-highlight-colour: rgb(240, 184, 45);

		--content-spacing: 24px;
		--box-item-padding: 12px;
	}

	/* Page content */
	:global(div.content-container) {
		padding: var(--content-spacing);
	}

	:global(h4.content-title) {
		text-transform: uppercase;
		margin-bottom: 18px;
		color: #fff;
		font-size: 16px;
	}

	/* Box content */
	:global(span.box-content-title) {
		color: var(--light-grey-text-colour);
		letter-spacing: 0.05em;
		font-size: 16px;
		cursor: pointer;
	}

	:global(.box-content-segment) {
		margin-top: 12px;
		color: var(--grey-text-colour);
	}

	:global(.box-content-segment span) {
		font-weight: bold;
	}

	:global(.box-content-segment ul) {
		margin-left: 24px;
	}
</style>
