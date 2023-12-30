<script>
// @ts-nocheck
    export let type = "regular";
    export let text = undefined;
    export let title = "";
</script>

{#if type == "delete"}
    <button class={type} on:click title="Poista muistiinpano">
        <span>x</span>
    </button>
{:else}
    <button class={type} title={title} on:click>{text}</button>
{/if}

<style>

    button {
        cursor: pointer;
        border-radius: 200px;
        text-transform: uppercase;
        background-color: var(--bg-color-primary);
        color: #fff;
    }
    
    button.regular {
        margin: 1em;
        padding: min(2vw, 0.75em) min(2vw, 1em);
        font-size: clamp(16px, calc(0.5rem + 2vw), 1.25em);
        font-weight: bold;
        box-shadow: 2px 2px 0px #000;
    }

    button.regular:active {
        box-shadow: none;
        transform: translate(0, 2px);
    }

    .delete {
        display: flex;
        justify-content: center;
        font-size: min(3.5vw, 1em);
        margin: 0 .5em 0.5em 0;
        font-weight: lighter;
        border-style: double;
        opacity: .85;
        padding: 5px 0;
        position: absolute;
        width: 3em;
        right: 0em;
        bottom: 0em;
    }

    .delete:active {
        box-shadow: 1px 1px 10px var(--bg-color-primary);
    }

    .delete:hover {
        opacity: 0.75;
    }

</style>