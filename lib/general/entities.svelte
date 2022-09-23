<script>
	export let caseData;

	async function getEntities() {
		const res = await fetch(`/api/cases/${caseData.id}/targets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let body = await res.json();
        for (let i = 0; i < body.length; i++) {
			let tmp = body[i];
            tmp.title = "Unknown";

            if (tmp.aliases == null) {
                tmp.aliases = [];
            }

			// Entity Name
			if (tmp.name == null) {
				if (tmp.aliases.length !== 0) {
					tmp.title = tmp.aliases[0];
				}
			} else {
				tmp.title = tmp.name;
			}

			// Entity relation
			if (tmp.relation != null) {
                if (tmp.age) {
                    if (tmp.sex === 0) {
                        tmp.title += ` (${tmp.relation}, ${tmp.age}M)`;
                    } else if (tmp.sex === 1) {
                        tmp.title += ` (${tmp.relation}, ${tmp.age}F)`;
                    } else {
                        tmp.title += ` (${tmp.relation}, ${tmp.age})`;
                    }
                } else {
                    if (tmp.sex === 0) {
                        tmp.title += ` (${tmp.relation}, M)`;
                    } else if (tmp.sex === 1) {
                        tmp.title += ` (${tmp.relation}, F)`;
                    }   else {
                        tmp.title += ` (${tmp.relation})`;
                    }
                }
			} else {
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
            }

			body[i] = tmp;
		}

        return body;
	}

    let entityData = getEntities();
</script>

{#await entityData}
	<p>Loading...</p>
{:then data}
	<div class="container">
		{#each data as entity}
			<div class="box{entity.highlight === true ? "-hl" : ""}">
				<div class="contents">
                    <!-- Title -->
					<h3>{entity.title}</h3>

                    <!-- Aliases -->
                    {#if entity.aliases.length > 0}
                        <p>Aliases:</p>
                        <ul>
                            {#each entity.aliases as alias}
                                <li>{alias}</li>
                            {/each}
                        </ul>
                    {/if}
				</div>
			</div>
		{/each}

		{#if data.length === 0}
			<p>No entries found.</p>
		{/if}
	</div>
{:catch}
	<p>Failed.</p>
{/await}

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
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
	}
    /* No need to start overwriting box-shadow */
    .box-hl {
		box-shadow: 0 2px 4px 0 goldenrod;
        background-color: #FFF9CC;
		transition: 0.3s;
		border-radius: 12px;
		min-height: 125px;
		width: 30%;
		margin: 18px;
	}
	.contents {
		padding: 1em;
	}
    h3 {
        margin-bottom: 11px;
    }
	ul {
		margin-left: 28px;
	}
</style>
