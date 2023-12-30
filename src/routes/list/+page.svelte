
<script>
// @ts-nocheck
    import Note from "../Note.svelte";
    import {notes} from "$lib/stores";
    import Button from "../Button.svelte";
    import Select from "../Select.svelte";
    import Footer from "../Footer.svelte";

    let notesAll = $notes;
    let selectedCourse = "All";

    function filterList(notes = []){
        // jos muu kuin 'All' valittuna -> seulotaan valinnan mukaan kurssin muistiinpanot
        if(selectedCourse != "All"){
            notes = notes.filter(({course: {name}}) => name == selectedCourse);
        }
        return notes;
    }

    // jos kurssi vaihdetaan select-valikosta
    $: selectedCourse, notesAll = filterList($notes)
    // muistiinpanon poistaminen muistiinpanon id-arvon perusteella
    const deleteNote = (id) => notes.remove(id);
    
    console.log("notes length", $notes.length);
    console.log("notes", $notes);
</script>


<div id="list-container">
    <div id="select-container">
        <Select bind:value={selectedCourse} showAll={true} on:change={() => filterList($notes)} selectId={"select-list"}/>
    </div>
    
    <div id="notes-container">
        {#if notesAll.length > 0}
            <!-- note.id-arvo ei voi olla duplikaatti -->
            {#each notesAll as note (note.id)}
                <Note text={note.text} timestamp={note.timestamp} course={note.course}>
                    <Button type="delete" on:click={() => deleteNote(note.id)}/>
                </Note>
            {/each}
        {:else}
            <p>Ei muistiinpanoja!</p>
        {/if}
        <Footer />
    </div>
</div>

<style>
    p {
        font-size: clamp(1em, calc(1rem + 2vw), 2em);
    }
</style>