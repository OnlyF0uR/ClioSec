<script>
	import { page } from '$app/stores';
	import Exception from '/lib/exception.svelte';
</script>

<svelte:head>
	<title>ClioSec - {$page.status}</title>
</svelte:head>

<Exception code="{$page.status}" msg="{$page.error.message}" />
