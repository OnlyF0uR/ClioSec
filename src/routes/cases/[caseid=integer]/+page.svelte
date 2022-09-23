<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	// Construct component list
	import Todo from '/lib/todo.svelte';
	import Names from '/lib/general/names.svelte';

	const componentList = {
		"gen-nms": Names,
		"ex": Todo
	}

	async function getCase() {
		const res = await fetch('/api/cases/' + $page.params.caseid, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await res.json();

		if (browser) {
			// client-only code here
			document.title = 'Case: ' + data.name ?? 'Unknown Project';
		}

		return data;
	}

	let caseData = getCase() ?? {};

	// Categories
	let generalToggle = true;
	let historyToggle = true;
	let recordsToggle = false;
	let psychToggle = false;

	// Context
	let Context = undefined;
	async function handleClick(cnt) {
		if (cnt in componentList) {
			Context = componentList[cnt];
		} else {
			Context = componentList.ex;
		}
	}
</script>

<div class="sidebar">
	<span class="opt active cat">Overview</span>
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
			<li><span on:click={() => handleClick("gen-nms")} class="opt sub"> - Names/Aliases</span></li>
			<li><span on:click={() => handleClick("gen-eml")} class="opt sub"> - E-Mail</span></li>
			<li><span on:click={() => handleClick("gen-lcs")} class="opt sub"> - Locations</span></li>
			<li><span on:click={() => handleClick("gen-nmbr")} class="opt sub"> - Phone/Fax/Social Numbers</span></li>
			<li><span on:click={() => handleClick("gen-sm")} class="opt sub"> - Social Media</span></li>
			<li><span on:click={() => handleClick("gen-ipdr")} class="opt sub"> - IP Addresses</span></li>
			<li><span on:click={() => handleClick("gen-dmns")} class="opt sub"> - Domains</span></li>
			<li><span on:click={() => handleClick("gen-img")} class="opt sub"> - Images</span></li>
			<li><span on:click={() => handleClick("gen-act")} class="opt sub"> - Activities</span></li>
			<li><span on:click={() => handleClick("gen-lng")} class="opt sub"> - Languages</span></li>
			<li><span on:click={() => handleClick("gen-hb")} class="opt sub"> - Hobbys</span></li>
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
			<li><span on:click={() => handleClick("his-edu")} class="opt sub"> - Education</span></li>
			<li><span on:click={() => handleClick("his-wexp")} class="opt sub"> - Work Experience</span></li>
			<li><span on:click={() => handleClick("his-schdl")} class="opt sub"> - Schedule</span></li>
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
			<li><span on:click={() => handleClick("rec-prt")} class="opt sub"> - Property</span></li>
			<li><span on:click={() => handleClick("rec-crm")} class="opt sub"> - Criminal</span></li>
			<li><span on:click={() => handleClick("rec-brth")} class="opt sub"> - Birth</span></li>
			<li><span on:click={() => handleClick("rec-dth")} class="opt sub"> - Death</span></li>
			<li><span on:click={() => handleClick("rec-fnc")} class="opt sub"> - Financial</span></li>
			<li><span on:click={() => handleClick("rec-med")} class="opt sub"> - Medical</span></li>
			<li><span on:click={() => handleClick("rec-pol")} class="opt sub"> - Political</span></li>
			<li><span on:click={() => handleClick("rec-bsn")} class="opt sub"> - Buisiness</span></li>
			<li><span on:click={() => handleClick("rec-gov")} class="opt sub"> - Government</span></li>
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
			<li><span on:click={() => handleClick("psy-nv")} class="opt sub"> - Non-Verbal</span></li>
			<li><span on:click={() => handleClick("psy-ltr")} class="opt sub"> - Literature</span></li>
			<li><span on:click={() => handleClick("psy-bhvr")} class="opt sub"> - Behaviour</span></li>
			<li><span on:click={() => handleClick("psy-prnc")} class="opt sub"> - Principles</span></li>
		</ul>
	{/if}
</div>
<div class="sidebar-right">
	<div class="social-links">
		<i class="fa-solid fa-plus" />
		<i class="fa-solid fa-diagram-project" />
		<i class="fa-solid fa-trash" />
	</div>
	<div class="useful-links">
		<i class="fa-solid fa-circle-info" />
		<i class="fa-solid fa-code-merge" />
	</div>
</div>

<div class="content">
	{#await caseData}
		<p>Loading...</p>
	{:then data}
		<svelte:component this={Context} data={data}/>
	{:catch}
		<p>Failed.</p>
	{/await}
</div>

<!-- https://www.color-hex.com/color-palette/1018207 -->
<style>
	/* Sidebar */
	.sidebar {
		margin: 0;
		padding: 0;
		width: 175px;
		box-shadow: 0px 0px 1px #232931;
		position: fixed;
		height: 100%;
		overflow: auto;
	}

	.sidebar span {
		display: block;
		color: black;
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

	.sidebar .opt.active {
		background-color: #587983;
		color: white;
	}

	.sidebar .opt:hover:not(.active) {
		background-color: #9db3b4;
		color: white;
	}

	.sub {
		font-size: 0.85em;
		padding-left: 10px;
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
		box-shadow: 0px 0px 1px #232931;
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

	/* Content */
	div.content {
		margin-left: 175px;
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
