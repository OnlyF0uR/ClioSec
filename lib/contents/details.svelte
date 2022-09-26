<script>
	import Modal, { getModal } from '/lib/modal.svelte';
	import { goto } from '$app/navigation';

	export let caseData;

	function deleteCase() {
		getModal('delete-ovw').close();
		goto('/cases');
	}
</script>

<div class="content-container">
	<h4 class="content-title">Case details</h4>
	<div class="row">
		<div class="details">
			<span class="box-content-title">
				Information
			</span>
			<p><strong>Name:</strong> {caseData.name}</p>
			<p><strong>Description:</strong> {caseData.desc ?? 'N/A'}</p>
		</div>
		<div class="stats">
			<div class="num">
				<div class="stat1" />
				<div class="stat2" />
			</div>
			<div class="graph" />
		</div>
	</div>
</div>

<Modal id="delete-ovw">
	<h3 style="margin-bottom: 11px;">Case Deletion</h3>
	<p>
		Are you sure you want to delete? You will <strong>NOT</strong> be able to recover it afterwards.
	</p>

	<button id="deleteButton" on:click={deleteCase}>Confirm</button>
</Modal>

<style>
	:root {
		--row1-height: 60vh;
		--row1-spacing: 30%;

		--row2-sub1-height: 20%;
	}

	.row {
		display: flex;
		gap: var(--content-spacing);
		min-height: var(--row1-height);
		max-height: var(--row1-height);
	}

	.row div {
		border-radius: 4px;
	}

	.row > .details {
		background-color: var(--blue-colour);
		width: var(--row1-spacing);

		padding: var(--box-item-padding);
	}

	.row > .stats {
		width: calc(100% - var(--content-spacing) - var(--row1-spacing));

		display: flex;
		flex-wrap: wrap;
		gap: var(--content-spacing);
	}

	.row > .stats div {
		width: 100%;
	}

	.row > .stats > .num {
		height: var(--row2-sub1-height);
		display: flex;
		gap: var(--content-spacing);
	}

	.row > .stats > .num div {
		width: calc((100% - var(--content-spacing)) / 2);
		background-color: var(--blue-variant-colour);
	}

	.row > .stats > .graph {
		background-color: var(--blue-colour);
		height: calc(100% - var(--row2-sub1-height) - var(--content-spacing));
	}

	/* Modal */
	#deleteButton {
		border: 1px solid transparent;
		padding: 9px 35px;
		font-size: 14px;
		border-radius: 4px;
		background-color: var(--light-red-colour);
		border-color: var(--red-colour);
		color: white;
		margin-top: 10px;
		float: right;
	}

	#deleteButton:hover {
		background-color: var(--red-colour);
		cursor: pointer;
	}
</style>
