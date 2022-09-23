<script>
    export let code = 'N/A';
    export let msg = 'N/A';
</script>

<p>A <strong>{code}</strong> error occurred: <span class="error-msg">{msg}</span>.</p>

<style>
    p {
        margin: 50px 50px;
    }
    .error-msg {
        font-style: italic;
        color: darkslategray;
    }
</style>