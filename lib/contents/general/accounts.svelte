<script>
	import { onMount } from 'svelte';
	export let caseData;

	let emailAddresses = [];
	onMount(async () => {
		const res = await fetch(`/api/cases/${caseData.id}/accounts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		emailAddresses = await res.json();
	});
</script>

<div class="content-container">
	<h4 class="content-title">Accounts</h4>
	<div class="flex">
		{#each emailAddresses as addr}
			<div class="box">
				<span class="box-content-title"
					>{addr.service}{addr.uri == null ? '' : ` (${addr.uri})`}</span
				>
				<div class="box-content-segment">
					{#if addr.username != null}
						<p><span>Username:</span> {addr.username}</p>
					{/if}
					{#if addr.email != null}
						<p><span>Email:</span> {addr.email}</p>
					{/if}
					{#if addr.email != null}
						<p><span>Password/Key:</span> {addr.secret}</p>
					{/if}
					{#if addr.email != null}
						<p><span>Password Hash:</span> {addr.secrethash}</p>
					{/if}
				</div>
				{#if addr.security_questions != null && addr.security_questions.length > 0}
					<div class="box-content-segment">
						<span>Security Questions:</span>
						<ul>
							{#each addr.security_questions as obj}
								<li>
									{#if obj.question != null}
										<span>Q: </span>{obj.question}
										{#if obj.answer != null}
											- <span>A: </span>{obj.answer}
										{/if}
									{:else if obj.answer != null}
                                        <span>A: </span>{obj.answer}
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
                <div class="box-content-segment">
                    <span>Associated Target:</span>
                    <p>{addr.target_title}</p>
                </div>
			</div>
		{/each}
	</div>
</div>

<style>
	div.flex {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		gap: var(--content-spacing);
	}

	.flex > .box {
		background-color: var(--blue-colour);
		padding: var(--box-item-padding);
		border-radius: 4px;
	}
</style>
