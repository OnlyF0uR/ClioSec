<script>
	import { page } from '$app/stores';

	async function getCase() {
		const res = await fetch('/api/cases/' + $page.params.caseid, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return await res.json();
	}

	let caseData = getCase() ?? {};
</script>

<div class="sidebar">
	<a href=" " class="active">Overview</a>
	<br />
	<hr />
	<br />
	<a href="#nms">Names</a>
	<a href="#addr">Addresses</a>
	<a href="#nv-comm">Non-Verbal Comm.</a>
	<br />
	<hr />
	<br />
</div>

<div class="content">
	{#await caseData}
		<p>Loading...</p>
	{:then data}
		<p><strong>Name:</strong> {data.name}</p>
		<p><strong>Description:</strong> {data.desc ?? "N/A"}</p>
	{:catch}
		<p>Failed.</p>
	{/await}
</div>

<style>
	.sidebar {
		margin: 0;
		padding: 0;
		width: 175px;
		background-color: #f1f1f1;
		position: fixed;
		height: 100%;
		overflow: auto;
	}

	.sidebar a {
		display: block;
		color: black;
		padding: 6px;
		text-decoration: none;
	}

	.sidebar a.active {
		background-color: #04aa6d;
		color: white;
	}

	.sidebar a:hover:not(.active) {
		background-color: #555;
		color: white;
	}

	.sidebar hr {
		width: 80%;
		margin: auto;
		border: 0;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	}

	/* Content */
	div.content {
		margin-left: 175px;
		padding: 1em;
	}

	@media screen and (max-width: 700px) {
		.sidebar {
			width: 100%;
			height: auto;
			position: relative;
		}
		.sidebar a {
			float: left;
		}
		div.content {
			margin-left: 0;
		}
	}

	@media screen and (max-width: 400px) {
		.sidebar a {
			text-align: center;
			float: none;
		}
	}
</style>
