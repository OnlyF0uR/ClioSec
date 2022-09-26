<script>
	import { getModal } from '/lib/modal.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	// Construct component list
	import CaseComponent from '/lib/contents/details.svelte';
	import TargetsComponent from '/lib/contents/target.svelte';
	import ExceptionComponent from '/lib/exception.svelte';
	import AccountsComponent from '/lib/contents/general/accounts.svelte';

	const componentList = {
		ovw: CaseComponent,
		trg: TargetsComponent,
		ex: ExceptionComponent,

		"gen-acn": AccountsComponent,
	};

	export let data;

	// Context
	let Context = componentList['ovw'];

	// Element/Tab selector
	let elem = undefined;
	let tab = 'ovw';

	// Categories
	let generalToggle = true;
	let historyToggle = true;
	let recordsToggle = false;
	let psychToggle = false;

	onMount(() => {
		elem = document.getElementById('ovw');
	});

	// =================== Category click ===================
	function catClick(e, cnt) {
		// Update the context
		if (cnt in componentList) {
			Context = componentList[cnt];
		} else {
			Context = componentList.ex;
		}

		if (browser) {
			let newElement = e.target;
			if (newElement.nodeName === 'SPAN') {
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

	// =================== Open a modal ===================
	function openModel(action) {
		getModal(action + '-' + tab).open();
	}

	// =================== Plus icon click ===================
	let lastRotationalValue = 0;
	function createClick(e) {
		if (browser) {
			lastRotationalValue += 90;
			e.target.style.transform = `rotate(${lastRotationalValue}deg)`;
		}

		openModel('create');
	}

	// =================== Graph icon title ===================
	function graphClick() {}
</script>

<svelte:head>
	<title>Case: {data.name}</title>
</svelte:head>

<div class="flex">
	<div class="navbar">
		<ul id="nav-items">
			<!-- Main opts -->
			<li id="ovw" class="active" on:click={(e) => catClick(e, 'ovw')}>
				<span>Case Details</span>
			</li>
			<li on:click={(e) => catClick(e, 'trg')}><span>Target Overview</span></li>
			<!-- General -->
			<li class="nav-title" on:click={() => (generalToggle = !generalToggle)}>
				General {#if generalToggle}
					<i class="fa-solid fa-chevron-up" />
				{/if}
				{#if !generalToggle}
					<i class="fa-solid fa-chevron-down" />
				{/if}
			</li>
			{#if generalToggle}
				<li on:click={(e) => catClick(e, 'gen-acn')}><span> - Accounts</span></li>
				<li on:click={(e) => catClick(e, 'gen-lcs')}><span> - Locations</span></li>
				<li on:click={(e) => catClick(e, 'gen-nmbr')}>
					<span> - Phone/Fax/Social Numbers</span>
				</li>
				<li on:click={(e) => catClick(e, 'gen-sec')}><span> - Secrets</span></li>
				<li on:click={(e) => catClick(e, 'gen-ipdr')}><span> - IP Addresses</span></li>
				<li on:click={(e) => catClick(e, 'gen-dmns')}><span> - Domains</span></li>
				<li on:click={(e) => catClick(e, 'gen-img')}><span> - Images</span></li>
				<li on:click={(e) => catClick(e, 'gen-act')}><span> - Activities</span></li>
				<li on:click={(e) => catClick(e, 'gen-lng')}><span> - Languages</span></li>
				<li on:click={(e) => catClick(e, 'gen-hbs')}><span> - Hobbys</span></li>
				<li on:click={(e) => catClick(e, 'gen-nts')}><span> - Notes</span></li>
			{/if}
			<!-- History -->
			<li class="nav-title" on:click={() => (historyToggle = !historyToggle)}>
				History {#if historyToggle}
					<i class="fa-solid fa-chevron-up" />
				{/if}
				{#if !historyToggle}
					<i class="fa-solid fa-chevron-down" />
				{/if}
			</li>
			{#if historyToggle}
				<li on:click={(e) => catClick(e, 'his-edu')}><span> - Education</span></li>
				<li on:click={(e) => catClick(e, 'his-wexp')}><span> - Work Experience</span></li>
				<li on:click={(e) => catClick(e, 'his-schdl')}><span> - Schedule</span></li>
			{/if}
			<!-- Records -->
			<li class="nav-title" on:click={() => (recordsToggle = !recordsToggle)}>
				Records {#if recordsToggle}
					<i class="fa-solid fa-chevron-up" />
				{/if}
				{#if !recordsToggle}
					<i class="fa-solid fa-chevron-down" />
				{/if}
			</li>
			{#if recordsToggle}
				<li on:click={(e) => catClick(e, 'rec-prt')}><span> - Property</span></li>
				<li on:click={(e) => catClick(e, 'rec-crm')}><span> - Criminal</span></li>
				<li on:click={(e) => catClick(e, 'rec-brth')}><span> - Birth</span></li>
				<li on:click={(e) => catClick(e, 'rec-dth')}><span> - Death</span></li>
				<li on:click={(e) => catClick(e, 'rec-fnc')}><span> - Financial</span></li>
				<li on:click={(e) => catClick(e, 'rec-med')}><span> - Medical</span></li>
				<li on:click={(e) => catClick(e, 'rec-pol')}><span> - Political</span></li>
				<li on:click={(e) => catClick(e, 'rec-bsn')}><span> - Buisiness</span></li>
				<li on:click={(e) => catClick(e, 'rec-gov')}><span> - Government</span></li>
			{/if}
			<!-- Psychology -->
			<li class="nav-title" on:click={() => (psychToggle = !psychToggle)}>
				Psychology {#if psychToggle}
					<i class="fa-solid fa-chevron-up" />
				{/if}
				{#if !psychToggle}
					<i class="fa-solid fa-chevron-down" />
				{/if}
			</li>
			{#if psychToggle}
				<li on:click={(e) => catClick(e, 'psy-nv')}><span> - Non-Verbal</span></li>
				<li on:click={(e) => catClick(e, 'psy-ltr')}><span> - Literature</span></li>
				<li on:click={(e) => catClick(e, 'psy-bhvr')}><span> - Behaviour</span></li>
				<li on:click={(e) => catClick(e, 'psy-prnc')}><span> - Principles</span></li>
			{/if}
		</ul>
	</div>
	<div class="content">
		{#if data}
			<svelte:component this={Context} caseData={data} />
		{/if}
	</div>
	<div class="actionbar">
		<div class="social-links">
			{#if tab === 'ovw'}
				<i
					on:click={() => openModel('delete')}
					class="fa-solid fa-trash"
					style="color: var(--light-red-colour);"
				/>
			{/if}
			{#if tab !== 'ovw'}
				<!-- This function also opens model -->
				<i on:click={createClick} class="fa-solid fa-plus" style="color: var(--green-colour);" />
				<i
					on:click={graphClick}
					class="fa-solid fa-diagram-project"
					style="color: var(--light-blue-colour);"
				/>
			{/if}
		</div>
		<div class="useful-links">
			<i
				on:click={() => goto('https://github.com/OnlyF0uR/ClioSec')}
				class="fa-solid fa-code-merge"
				style="color: var(--dark-grey-colour);"
			/>
			<i
				on:click={() => goto('https://github.com/OnlyF0uR/ClioSec/wiki')}
				class="fa-solid fa-circle-info"
				style="color: var(--blue-variant-colour);"
			/>
		</div>
	</div>
</div>

<style>
	.flex {
		display: flex;
		min-height: 100vh;
		overflow: auto;
	}

	/* Navbar */
	.flex > .navbar {
		background-color: var(--blue-colour);
		margin-right: auto;
		width: 15%;
		display: block;

		overflow: auto;
		height: 100vh;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.flex > .navbar::-webkit-scrollbar {
		display: none;
	}

	#nav-items {
		padding: 12px;
		list-style: none;
	}

	li.nav-title {
		color: var(--light-grey-text-colour);
		padding: 12px 8px;
		letter-spacing: 0.05em;
		font-size: 11px;
		text-transform: uppercase;
		font-weight: 600;
		cursor: pointer;
	}

	li:not(.nav-title) {
		color: var(--grey-text-colour);
		cursor: pointer;
		padding: 4px 20px;
		transition: all 0.2s;
		border-radius: 4px;
	}

	li:hover:not(.nav-title) {
		color: #fff;
		background-color: #545a6d;
	}

	li.active:not(.nav-title) {
		color: rgb(189, 189, 189);
	}

	/* Actionbar */
	.flex > .actionbar {
		background-color: var(--blue-colour);
		margin-left: auto;
		width: 50px;
	}

	.social-links i,
	.useful-links i {
		width: 32px;
		margin: 8px auto;
		cursor: pointer;
		font-size: 18px;
	}
	.social-links {
		text-align: center;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.useful-links {
		text-align: center;
		position: absolute;
		bottom: 30px;
	}
	.social-links i {
		transition-duration: 1s;
	}

	/* Content */
	.flex > .content {
		background-color: var(--dark-blue-colour);
		width: 100%;

		overflow: auto;
		height: 100vh;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.flex > .content::-webkit-scrollbar {
		display: none;
	}
</style>
