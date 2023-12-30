
<script>
// @ts-nocheck
    import { courses } from "$lib/stores";

    export let showAll = false;
    export let enabled = true;
    export let value = "";
    export let selectId = "";
    // create-näkymään (showAll = false) ei tule 'All'-valintaa select-elementin vaihtoehdoksi (arvoksi listan 1. kurssin nimi)
    if(!showAll) value = $courses[0].name;

</script>

<div>

</div>
<label for="{selectId}">Course:</label>
<select bind:value on:change name="{selectId}" id="{selectId}" disabled={!enabled} title="Valitse kurssi">
    {#if showAll}
        <!-- vain listaus-näkymässä (/list) mukana -->
        <option value="All">All</option>
    {/if}
    {#each $courses as course}
        <option value="{course.name}">{course.name}</option>
    {/each}
</select>

<style>
    select {
        padding: .5em;
        font-size: clamp(1em, 4vw, 1.5em);
        max-width: 10em;
    }

    select#select-create {
        margin: .75em 0;
    }

    select#select-list {
        margin: 1em 0 0.5em 0;
    }

    label {
        font-size: clamp(1.25em, 6vw, 2em);
    }

</style>