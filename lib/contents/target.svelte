<script>
	import Modal, { getModal } from '/lib/modal.svelte';
	import { onMount } from 'svelte';

	export let caseData;

	let entityData = null;
	onMount(async () => {
		const res = await fetch(`/api/cases/${caseData.id}/targets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		entityData = await res.json();
	});
</script>

{#if entityData != null}
	<div class="content-container">
		{#if entityData.primary.length > 0 || entityData.secondary.length > 0 || entityData.tertiary.length > 0}
			<div class="target-group">
				<h4 class="content-title">Primary targets</h4>
				<div class="row primary">
					{#each entityData.primary as entity}
						<div class="target">
							<div class="target-content">
								<span class="box-content-title">{entity.title}</span>
								{#if entity.relations != null}
									<div class="box-content-segment">
										<span>Relations:</span>
										<ul>
											{#each entity.relations as rel}
												<li>
													{rel.title} -
													<i class={rel.illicit ? 'illicit' : ''}>
														{rel.type}
													</i>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
								{#if entity.metadata != null}
									<div class="box-content-segment">
										<span>Metadata:</span>
										<ul>
											{#each entity.metadata as dat}
												<li>
													<span>{dat.type}</span> - {dat.description}
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="target-group">
				<h4 class="content-title">Secondary targets</h4>
				<div class="row">
					{#each entityData.secondary as entity}
						<div class="target">
							<div class="target-content">
								<span class="box-content-title">{entity.title}</span>
								{#if entity.relations != null}
									<div class="box-content-segment">
										<span>Relations:</span>
										<ul>
											{#each entity.relations as rel}
												<li>
													{rel.title} -
													<i class={rel.illicit ? 'illicit' : ''}>
														{rel.type}
													</i>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
								{#if entity.metadata != null}
									<div class="box-content-segment">
										<span>Metadata:</span>
										<ul>
											{#each entity.metadata as dat}
												<li>
													<span>{dat.type}</span> - {dat.description}
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="target-group">
				<h4 class="content-title">Tertiary targets</h4>
				<div class="row">
					{#each entityData.tertiary as entity}
						<div class="target">
							<div class="target-content">
								<span class="box-content-title">{entity.title}</span>
								{#if entity.relations != null}
									<div class="box-content-segment">
										<span>Relations:</span>
										<ul>
											{#each entity.relations as rel}
												<li>
													{rel.title} -
													<i class={rel.illicit ? 'illicit' : ''}>
														{rel.type}
													</i>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
								{#if entity.metadata != null}
									<div class="box-content-segment">
										<span>Metadata:</span>
										<ul>
											{#each entity.metadata as dat}
												<li>
													<span>{dat.type}</span> - {dat.description}
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<p>No targets found.</p>
		{/if}
	</div>
{/if}

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
		padding: var(--box-item-padding);
	}

	.box-content-segment > ul i.illicit {
		color: var(--light-red-colour);
	}
</style>
