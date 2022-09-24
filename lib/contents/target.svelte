<script>
	import Modal, { getModal } from '/lib/modal.svelte';
	import ContentSeperator from '/lib/utils/content-seperator.svelte';

	export let caseData;

	async function getEntities() {
		const res = await fetch(`/api/cases/${caseData.id}/targets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let body = await res.json();
		let result = {
			hl: [],
			def: []
		};

		for (let i = 0; i < body.length; i++) {
			let tmp = body[i];
			tmp.title = 'Unknown';

			if (tmp.aliases == null) {
				tmp.aliases = [];
			}

			if (tmp.relations == null) {
				tmp.relations = [];
			}

			// =================== Entity title ===================
			if (tmp.name == null) {
				if (tmp.aliases.length !== 0) {
					tmp.title = tmp.aliases[0];
				}
			} else {
				tmp.title = tmp.name;
			}

			if (tmp.age) {
				if (tmp.sex === 0) {
					tmp.title += ` (${tmp.age}M)`;
				} else if (tmp.sex === 1) {
					tmp.title += ` (${tmp.age}F)`;
				} else {
					tmp.title += ` (${tmp.age})`;
				}
			} else {
				if (tmp.sex === 0) {
					tmp.title += ` (M)`;
				} else if (tmp.sex === 1) {
					tmp.title += ` (F)`;
				} else {
					tmp.title += ` (${tmp.age})`;
				}
			}

			// =================== Highlight sort ===================
			if (tmp.highlight === true) {
				result.hl.push(tmp);
			} else {
				result.def.push(tmp);
			}
		}

		return result;
	}

	let entityData = getEntities();

	function idToName(id, dataset) {
		// Primary dataset
		for (let i = 0; i < dataset.hl.length; i++)
			if (dataset.hl[i].id === id) return dataset.hl[i].name ?? 'N/A';

		// Secondary dataset
		for (let i = 0; i < dataset.def.length; i++)
			if (dataset.def[i].id === id) return dataset.def[i].name ?? 'N/A';

		return '?';
	}

	// Please do not take this political
	// This is merely to indicate something could be off
	const illicitRelations = [
		"paramour",
		"bastard child",
		"bastard son",
		"bastard daughter",
		"illegitimate father",
		"illegitimate mother"
	];
</script>

{#await entityData}
	<p>Loading...</p>
{:then data}
	<h2 style="margin-bottom: 18px;">Target Overview</h2>
	<ContentSeperator />

	<h4>Primary targets</h4>
	<!-- Highlighted targets -->
	<div class="container">
		{#each data.hl as entity}
			<div class="box hl">
				<div class="contents">
					<!-- Title -->
					<h3>{entity.title}</h3>

					<!-- Relations (Yes, plural)-->
					<p>Relations:</p>
					<ul class="info-list">
						<!-- Loop through relations -->
						{#each entity.relations as rel}
						<li>{idToName(rel.id, data) ?? 'N/A'} - <i class={ illicitRelations.includes(rel.type.toLowerCase()) ? 'illicit' : ''}>{rel.type}</i></li>
						{/each}
					</ul>

					<!-- Aliases -->
					{#if entity.aliases.length > 0}
						<p>Aliases:</p>
						<ul class="info-list">
							{#each entity.aliases as alias}
								<li>{alias}</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<ContentSeperator />
	<h4>Secondary targets</h4>

	<!-- Default targets -->
	<div class="container">
		{#each data.def as entity}
			<div class="box">
				<div class="contents">
					<!-- Title -->
					<h3>{entity.title}</h3>

					<!-- Loop through relations -->
					<p>Relations:</p>
					<ul class="info-list">
						{#each entity.relations as rel}
							<li>{idToName(rel.id, data) ?? 'N/A'} - <i class={ illicitRelations.includes(rel.type.toLowerCase()) ? 'illicit' : ''}>{rel.type}</i></li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>

	{#if data.hl.length === 0 && data.def.length === 0}
		<p>No entries found.</p>
	{/if}
{:catch}
	<p>Failed.</p>
{/await}

<Modal id="create-trg">
	<h3 style="margin-bottom: 11px;">Target creation</h3>
	<p>WIP</p>
</Modal>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		margin-top: -10px;
	}
	.box {
		box-shadow: 0 2px 4px 0 #434343;
		transition: 0.3s;
		border-radius: 12px;
		min-height: 125px;
		width: 30%;
		margin: 18px;
		cursor: pointer;
	}
	/* Overwrite box */
	.hl {
		box-shadow: 0 2px 4px 0 goldenrod;
		background-color: #fff9cc;
	}

	.box:hover {
		transform: scale(1.04);
	}

	.contents {
		padding: 1em;
	}
	p {
		margin-top: 11px;
	}
	ul.info-list {
		margin-left: 28px;
	}
	.illicit {
		color: red;
	}
</style>
