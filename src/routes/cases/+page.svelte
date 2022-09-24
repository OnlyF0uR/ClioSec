<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>ClioSec - Cases</title>
	<meta name="description" content="List of all active cases" />
</svelte:head>

<div class="container">
	<!-- Loop through all cases -->
	{#each data.cases as { id, name }}
		<a href="/cases/{id}">
			<div class="case-item">
				<p><strong>{id}</strong>: {name}</p>
			</div>
		</a>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		margin-top: 12px;
		padding: 0 120px;

		text-align: center;
		line-height: 50px;
	}
	.case-item {
		/* border: 1px solid; */
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		border-radius: 12px;
		height: 50px;
		margin: 12px;
	}
	.case-item:hover {
		transform: scale(1.08);
		background-color: azure;
	}
</style>
