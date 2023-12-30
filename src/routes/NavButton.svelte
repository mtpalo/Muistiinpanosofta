
<script>
// @ts-nocheck

    export let linkName = undefined;
    export let href = undefined;
    export let el_class = "enabled_link";
    export let title = "";

</script>

<a href="./{href}" class="{el_class}" title={title}>{linkName}</a>

<style>
    a {
        font-family: var(--primary-font-family);
        text-decoration: none;
        color: #000;
        font-size: min(1.5em, 6vw);
        border: 2px solid black;
        padding: .5em;
        border-radius: 15px;
    }

    a.enabled_link:hover {
        box-shadow: 2px 2px 2px 1px var(--bg-color-primary);
        opacity: 0.5;
    }

</style>