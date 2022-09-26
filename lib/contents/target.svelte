<script>
	import Modal, { getModal } from '/lib/modal.svelte';

	export let caseData;

	async function getEntities() {
		// Get the target data
		const res = await fetch(`/api/cases/${caseData.id}/targets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let body = await res.json();
		let result = {
			primary: [],
			secondary: [],
			tertiary: []
		};

		// Loop through categories
		for (const [key, value] of Object.entries(body)) {
			// Loop through entities
			for (let i = 0; i < value.length; i++) {
				let tmp = value[i];

				if (!tmp.aliases) tmp.aliases = [];
				if (!tmp.aliases) tmp.aliases = [];

				tmp.tite = 'Unknown';

				// Entity title
				if (tmp.name) tmp.title = tmp.name;
				else if (tmp.aliases.length) tmp.title = tmp.aliases[0];

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

				result[key].push(tmp);
			}
		}

		return body;
	}

	let entityData = getEntities();

	function idToName(id, dataset) {
		for (const [_, v] of Object.entries(dataset))
			for (let i = 0; i < v.length; i++) if (v[i].id === id) return v[i].name ?? 'N/A';

		return '?';
	}
</script>

{#await entityData then data}
	<div class="content-container">
		<div class="target-group">
			<h4 class="content-title">Primary targets</h4>
			<div class="row primary">
				{#each data.primary as entity}
					<div class="target">
						<div class="target-content">
							<span class="title">{entity.title}</span>
							<div class="relations">
								<p>Relations:</p>
								<ul>
									{#each entity.relations as rel}
										<li>
											{idToName(rel.id, data) ?? 'N/A'} -
											<i class={rel.illicit ? 'illicit' : ''}>
												{rel.type}
											</i>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="target-group">
			<h4 class="content-title">Secondary targets</h4>
			<div class="row">
				{#each data.secondary as entity}
					<div class="target">
						<div class="target-content">
							<span class="title">{entity.title}</span>
							<div class="relations">
								<p>Relations:</p>
								<ul>
									{#each entity.relations as rel}
										<li>
											{idToName(rel.id, data) ?? 'N/A'} -
											<i class={rel.illicit ? 'illicit' : ''}>
												{rel.type}
											</i>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="target-group">
			<h4 class="content-title">Tertiary targets</h4>
			<div class="row">
				{#each data.tertiary as entity}
					<div class="target">
						<div class="target-content">
							<span class="title">{entity.title}</span>
							<div class="relations">
								<p>Relations:</p>
								<ul>
									{#each entity.relations as rel}
										<li>
											{idToName(rel.id, data) ?? 'N/A'} -
											<i class={rel.illicit ? 'illicit' : ''}>
												{rel.type}
											</i>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/await}

<Modal id="create-trg">
	<h3 style="margin-bottom: 11px;">Target creation</h3>
	<p>WIP</p>
</Modal>

<style>
	.content-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		gap: var(--content-spacing);
	}

	div.target-group {
		min-height: 37.5vh;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;

		gap: var(--content-spacing);
	}

	.row > .target {
		border-radius: 4px;
		width: calc((100% - (var(--content-spacing) * 3)) / 4);

		height: 37.5vh;

		background-color: var(--blue-colour);
	}

	.row.primary > .target {
		box-shadow: 0 0 4px 1px var(--dark-highlight-colour);
	}

	.target-content {
		padding: 12px;
	}

	.target-content > .title {
		color: var(--light-grey-text-colour);
		letter-spacing: 0.05em;
		font-size: 16px;
		cursor: pointer;
	}

	.target-content > .relations {
		margin-top: 12px;
		color: var(--grey-text-colour);
	}

	.target-content > .relations p {
		font-weight: bold;
	}

	.target-content > .relations ul {
		margin-left: 24px;
	}

	.target-content > .relations ul i.illicit {
		color: var(--light-red-colour)
	}
</style>
