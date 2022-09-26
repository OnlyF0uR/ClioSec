<slot />

<style>
	:root {
		--dark-blue-colour: #212735;
		--blue-colour: #2a2f42;
		--blue-variant-colour: #3b4680;
		--light-blue-colour: #8bb5db;

		--main-colour: #587983;

		/* Icon-colour etc. */
		--light-red-colour: #d65551;
		--red-colour: #eb3731;
		--green-colour: #0cb403;
		--grey-colour: #8b8989;
		--dark-grey-colour: darkslategray;

		/* Highlights */
		--light-highlight-colour: #fff9cc;
		--dark-highlight-colour: rgb(240, 184, 45);

		--sidebar-box-shadow: 0px 0px 1px var(--grey-colour);

		--hr-border-top: 1px solid rgba(0, 0, 0, 0.1);
		--hr-border-bottom: 1px solid rgba(255, 255, 255, 0.3);

		--content-spacing: 24px;
	}

	:global(div.content-container) {
		padding: var(--content-spacing);
	}

	:global(h4.content-title) {
		text-transform: uppercase;
		margin-bottom: 18px;
		color: #fff;
		font-size: 16px;
	}

	:global(body) {
		background-color: var(--primary-colour);
	}
</style>
