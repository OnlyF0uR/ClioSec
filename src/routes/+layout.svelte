<slot />

<style>
	:root {
		--sidebar-colour: #1e222e;
		--sidebar-text-colour: #b3b7c7;

		--sidebar-active-colour: #648be7;
		--sidebar-active-text-colour: #dce8f5;


		--main-colour: #587983;
		/* --secondary-colour: #9db3b4; */

		/* Icon-colour etc. */
		--light-red-colour: #d65551;
		--red-colour: #eb3731;
		--green-colour: #0cb403;
		--grey-colour: #8b8989;
		--dark-grey-colour: darkslategray;
		--light-blue-colour: #8bb5db;
		--dark-blue-colour: rgb(71, 55, 177);

		/* Highlights */
		--light-highlight-colour: #fff9cc;
		--dark-highlight-colour: rgb(240, 184, 45);;

		--sidebar-box-shadow: 0px 0px 1px var(--grey-colour);

		--hr-border-top: 1px solid rgba(0, 0, 0, 0.1);
		--hr-border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	}

	:global(body) {
		background-color: var(--primary-colour);
	}
</style>
