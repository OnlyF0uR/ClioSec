<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Modal, { getModal } from '/lib/modal.svelte';

	// Construct component list
	import Overview from '/lib/general/overview.svelte';
	import Entities from '/lib/general/entities.svelte';
	import Exception from '/lib/exception.svelte';

	const componentList = {
		ovw: Overview,
		ent: Entities,
		ex: Exception
	};

	// Categories
	let generalToggle = true;
	let historyToggle = true;
	let recordsToggle = false;
	let psychToggle = false;

	// Context
	let Context = componentList['ovw'];

	// Element/Tab selector
	let elem = undefined;
	let tab = 'ovw';

	let caseData = getCase();

	// ===================================
	// FUNCTIONS
	// ===================================
	async function getCase() {
		const caseId = $page.params.caseid;

		const res = await fetch('/api/cases/' + caseId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await res.json();
		if (!data["ok"]) {
			alert("Invalid case.")
			goto("/cases")
			return null;
		}

		data["id"] = caseId;

		if (browser) {
			// Set the document title
			document.title = 'Case: ' + data.name ?? 'Unknown Project';
			// Define the overview element
			elem = document.getElementById('ovw');
		}

		return data;
	}

	async function catClick(e, cnt) {
		// Update the context
		if (cnt in componentList) {
			Context = componentList[cnt];
		} else {
			Context = componentList.ex;
		}

		if (browser) {
			let newElement = e.target;
			if (newElement.nodeName === 'SPAN' && newElement.id !== 'ovw' && newElement.id !== 'ent') {
				newElement = newElement.parentElement;
			}

			// Remove from old one
			elem.classList.remove('active');
			// Add list to new one
			newElement.classList.add('active');

			// Overwrite the current element
			elem = newElement;
		}

		// Update the tab metainf
		tab = cnt;
	}

	let lastRotationalValue = 0;
	function createClick(e) {
		if (browser) {
			lastRotationalValue += 90;
			e.target.style.transform = `rotate(${lastRotationalValue}deg)`;
		}
		
		getModal("create").open();
	}

	function deleteClick() {
		// Open modal
		getModal("delete").open();
	}

	function graphClick() {}

	function deleteCase() {
		// Close modal
		getModal('delete').close()
		// Redirect to cases page
		goto("/cases")
	} 
</script>

<div />
<div class="sidebar">
	<span id="ovw" on:click={(e) => catClick(e, 'ovw')} class="opt cat active">Case Details</span>
	<span id="ent" on:click={(e) => catClick(e, 'ent')} class="opt cat">Target Overview</span>
	<hr />

	<span class="cat" on:click={() => (generalToggle = !generalToggle)}
		>General
		{#if generalToggle}
			<i class="fa-solid fa-chevron-up" />
		{/if}
		{#if !generalToggle}
			<i class="fa-solid fa-chevron-down" />
		{/if}
	</span>
	{#if generalToggle}
		<ul>
			<li on:click={(e) => catClick(e, 'gen-eml')}><span class="opt"> - E-Mail</span></li>
			<li on:click={(e) => catClick(e, 'gen-lcs')}><span class="opt"> - Locations</span></li>
			<li on:click={(e) => catClick(e, 'gen-nmbr')}>
				<span class="opt"> - Phone/Fax/Social Numbers</span>
			</li>
			<li on:click={(e) => catClick(e, 'gen-sm')}><span class="opt"> - Social Media</span></li>
			<li on:click={(e) => catClick(e, 'gen-ipdr')}><span class="opt"> - IP Addresses</span></li>
			<li on:click={(e) => catClick(e, 'gen-dmns')}><span class="opt"> - Domains</span></li>
			<li on:click={(e) => catClick(e, 'gen-img')}><span class="opt"> - Images</span></li>
			<li on:click={(e) => catClick(e, 'gen-act')}><span class="opt"> - Activities</span></li>
			<li on:click={(e) => catClick(e, 'gen-lng')}><span class="opt"> - Languages</span></li>
			<li on:click={(e) => catClick(e, 'gen-hb')}><span class="opt"> - Hobbys</span></li>
		</ul>
	{/if}

	<hr />

	<span class="cat" on:click={() => (historyToggle = !historyToggle)}
		>History
		{#if historyToggle}
			<i class="fa-solid fa-chevron-up" />
		{/if}
		{#if !historyToggle}
			<i class="fa-solid fa-chevron-down" />
		{/if}
	</span>
	{#if historyToggle}
		<ul>
			<li on:click={(e) => catClick(e, 'his-edu')}><span class="opt"> - Education</span></li>
			<li on:click={(e) => catClick(e, 'his-wexp')}><span class="opt"> - Work Experience</span></li>
			<li on:click={(e) => catClick(e, 'his-schdl')}><span class="opt"> - Schedule</span></li>
		</ul>
	{/if}

	<hr />

	<span class="cat" on:click={() => (recordsToggle = !recordsToggle)}
		>Records
		{#if recordsToggle}
			<i class="fa-solid fa-chevron-up" />
		{/if}
		{#if !recordsToggle}
			<i class="fa-solid fa-chevron-down" />
		{/if}
	</span>
	{#if recordsToggle}
		<ul>
			<li on:click={(e) => catClick(e, 'rec-prt')}><span class="opt"> - Property</span></li>
			<li on:click={(e) => catClick(e, 'rec-crm')}><span class="opt"> - Criminal</span></li>
			<li on:click={(e) => catClick(e, 'rec-brth')}><span class="opt"> - Birth</span></li>
			<li on:click={(e) => catClick(e, 'rec-dth')}><span class="opt"> - Death</span></li>
			<li on:click={(e) => catClick(e, 'rec-fnc')}><span class="opt"> - Financial</span></li>
			<li on:click={(e) => catClick(e, 'rec-med')}><span class="opt"> - Medical</span></li>
			<li on:click={(e) => catClick(e, 'rec-pol')}><span class="opt"> - Political</span></li>
			<li on:click={(e) => catClick(e, 'rec-bsn')}><span class="opt"> - Buisiness</span></li>
			<li on:click={(e) => catClick(e, 'rec-gov')}><span class="opt"> - Government</span></li>
		</ul>
	{/if}

	<hr />

	<span class="cat" on:click={() => (psychToggle = !psychToggle)}
		>Psychology
		{#if psychToggle}
			<i class="fa-solid fa-chevron-up" />
		{/if}
		{#if !psychToggle}
			<i class="fa-solid fa-chevron-down" />
		{/if}
	</span>
	{#if psychToggle}
		<ul>
			<li on:click={(e) => catClick(e, 'psy-nv')}><span class="opt"> - Non-Verbal</span></li>
			<li on:click={(e) => catClick(e, 'psy-ltr')}><span class="opt"> - Literature</span></li>
			<li on:click={(e) => catClick(e, 'psy-bhvr')}><span class="opt"> - Behaviour</span></li>
			<li on:click={(e) => catClick(e, 'psy-prnc')}><span class="opt"> - Principles</span></li>
		</ul>
	{/if}
</div>

<div class="content">
	{#await caseData}
		<p>Loading...</p>
	{:then data}
		{#if data != null}
			<svelte:component this={Context} caseData={data} />
		{/if}
	{:catch}
		<p>Failed.</p>
	{/await}
</div>

<Modal id="create">
	<p>Hello world!</p>
</Modal>

<Modal id="delete">
	<h3 style="margin-bottom: 11px;">Case Deletion</h3>
	<p>Are you sure you want to delete? You will <strong>NOT</strong> be able to recover it afterwards.</p>

	<button id="deleteButton" on:click={deleteCase}>Confirm</button>
</Modal>

<div class="sidebar-right">
	<div class="social-links">
		{#if tab === 'ovw'}
			<i on:click={deleteClick} class="fa-solid fa-trash" style="color: firebrick;" />
		{/if}
		{#if tab !== 'ovw'}
			<i on:click={createClick} class="fa-solid fa-plus" style="color: green;" />
			<i on:click={graphClick} class="fa-solid fa-diagram-project" style="color: cadetblue;" />
		{/if}
	</div>
	<div class="useful-links">
		<i on:click={() => goto("https://github.com/OnlyF0uR/ClioSec")} class="fa-solid fa-code-merge" style="color: darkslategray;" />
		<i on:click={() => goto("https://github.com/OnlyF0uR/ClioSec/wiki")} class="fa-solid fa-circle-info" style="color: darkslateblue;" />
	</div>
</div>

<!-- https://www.color-hex.com/color-palette/1018207 -->
<style>
	/* Sidebar */
	.sidebar {
		margin: 0;
		padding: 0;
		width: 175px;
		box-shadow: 0px 0px 1px #434343;
		position: fixed;
		height: 100%;
		overflow: auto;
	}

	.sidebar span {
		display: block;
		text-decoration: none;
		cursor: pointer;
	}

	.sidebar i {
		font-size: 0.75em;
	}

	.sidebar .cat {
		padding: 4px;
		font-size: 0.97em;
	}

	.sidebar li {
		padding-top: 3px;
		padding-bottom: 3px;
		cursor: pointer;
	}

	.sidebar .opt {
		font-size: 0.85em;
		padding-left: 10px;
	}

	/* Active */
	:global(.sidebar li.active) {
		background-color: #587983;
		color: white;
	}

	.sidebar span.active {
		background-color: #587983;
		color: white;
	}

	/* Hover */
	.sidebar li:hover:not(.active) {
		background-color: #9db3b4;
		color: white;
	}

	.sidebar hr {
		width: 80%;
		margin: auto;
		border: 0;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
		margin-top: 11px;
	}

	/* Right sidebar */
	.sidebar-right {
		width: 50px;
		height: 100vh;
		box-shadow: 0px 0px 1px #434343;
		position: fixed;
		right: 0;
		top: 0;
	}

	.social-links i,
	.useful-links i {
		width: 32px;
		margin: 8px auto;
		cursor: pointer;
		font-size: 18px;
	}
	.social-links {
		width: 50px;
		text-align: center;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.useful-links {
		width: 50px;
		text-align: center;
		position: absolute;
		bottom: 30px;
	}

	.social-links i {
		transition-duration: 1s;
	}

	#deleteButton {
		border: 1px solid transparent;
		padding: 9px 35px;
		font-size: 14px;
		border-radius: 4px;
		background-color: #d9534f;
		border-color: #d43f3a;
		color: white;
		margin-top: 10px;
		float: right;
	}

	#deleteButton:hover {
		background-color: #d43f3a;
		cursor: pointer;
	}

	/* Content */
	div.content {
		/* Width of left sidebar */
		margin-left: 175px;
		/* Width of right sidebar */
		margin-right: 50px;
		padding: 1em;
	}

	@media screen and (max-width: 700px) {
		.sidebar {
			width: 100%;
			height: auto;
			position: relative;
		}
		.sidebar span {
			float: left;
		}
		div.content {
			margin-left: 0;
		}
	}

	@media screen and (max-width: 400px) {
		.sidebar span {
			text-align: center;
			float: none;
		}
	}
</style>
