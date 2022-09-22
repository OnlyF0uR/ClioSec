<script>
    import { page } from '$app/stores';
</script>

<p>A <strong>{$page.status}</strong> error occurred: <span class="error-msg">{$page.error.message}</span></p>

<style>
    p {
        margin: 50px 50px;
    }
    .error-msg {
        font-style: italic;
        color: darkslategray;
    }
</style>