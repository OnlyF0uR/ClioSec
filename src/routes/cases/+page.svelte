<script>
    async function getCases() {
        const res = await fetch("/api/cases/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    }

    let caseData = getCases() ?? [];
</script>

{#await caseData}
<p>Loading...</p>
{:then data}

<div class="container">
    {#each data as {id, name}}
    <a href="/cases/{id}">
        <div class="case-item">
            <p><strong>{id}</strong>: {name}</p>
        </div>
    </a>
    {/each}

    {#if data.length === 0}
        <p>No cases found</p>
    {/if}
</div>

{:catch}
<p>Failed.</p>
{/await}

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
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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