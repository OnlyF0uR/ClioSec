/** @type {import('./$types').PageLoad} */
export async function load({ fetch, setHeaders }) {
	const cases = await fetch(`/api/cases/`).then((r) => r.json());

	setHeaders({
		'cache-control': 'public, max-age=60'
	});

    // Forces the default to be {}, so we do not need to do another check
    // Before we activate the loop located in the .svelte file
	return { cases };
}