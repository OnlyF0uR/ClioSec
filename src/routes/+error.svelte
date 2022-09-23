<script>
	import { page } from '$app/stores';
	import Exception from '/lib/exception.svelte';
</script>

<Exception code="{$page.status}" msg="{$page.error.message}" />
