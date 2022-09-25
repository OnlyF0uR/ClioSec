<script>
	import Modal, { getModal } from '/lib/modal.svelte';
    import { goto } from '$app/navigation';
	import ContentSeperator from '/lib/utils/content-seperator.svelte';

	export let caseData;

	function deleteCase() {
		getModal("delete-ovw").close();
		goto('/cases');
	}
</script>

<h2 style="margin-bottom: 18px;">Case Details</h2>
<ContentSeperator />

<p><strong>Name:</strong> {caseData.name}</p>
<p><strong>Description:</strong> {caseData.desc ?? 'N/A'}</p>

<Modal id="delete-ovw">
	<h3 style="margin-bottom: 11px;">Case Deletion</h3>
	<p>
		Are you sure you want to delete? You will <strong>NOT</strong> be able to recover it afterwards.
	</p>

	<button id="deleteButton" on:click={deleteCase}>Confirm</button>
</Modal>

<style>
	#deleteButton {
		border: 1px solid transparent;
		padding: 9px 35px;
		font-size: 14px;
		border-radius: 4px;
		background-color: var(--light-red-colour);;
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
