<script>
// @ts-nocheck

    import { browser } from '$app/environment';
    import Select from "../Select.svelte";
    import Button from "../Button.svelte";
    import { notes, courses } from "$lib/stores";
    import utils from './functions.js';
    import Footer from '../Footer.svelte';
    
    // note
    let note = "", noteObj = {};
    // select-elementti
    let selectEnabled = true, selectedCourse = "";
    // session
    let sessionStarted = false, sessionNotes = [];
    // jos ei kursseja -> ohjataan etusivulle (create-näkymään ei tällöin pääse)
    if(!($courses.length > 0)){
        if (browser) {
            window.location.href = '/';
        }
    }

    function saveNote(){
        if(note.length > 0){
            // kurssi, joka on valittuna
            let course = $courses.find(({name}) => name == selectedCourse);
            // muistiinpanon tekohetken aika apufunktiolla (tiedostosta funtions.js)
            let now = utils.currentTimestamp();
            // objekti - uuden muistiinpanon tiedot 
            noteObj = {
                "id": $notes.length,
                "text": note,
                "course": {
                    "id": course?.id, 
                    "name": selectedCourse,
                },
                "timestamp": now,
            };
            // tyhjennetään kenttä tallennuksen yhteydessä
            note = "";
            // sessio alkoi tai jatkuu
            if(!sessionStarted) sessionStarted = true;
            // pidetään kirjaa session muistiinpanoista
            sessionNotes = [noteObj, ...sessionNotes];
            // store - lisätään muistiinpano
            notes.add(noteObj);
        }
    }

    // kurssia ei voi vaihtaa, kun sessio on käynnissä
    $: selectEnabled = !sessionStarted

    // session lopuksi
    $: if(sessionStarted == false && sessionNotes.length > 0) sessionNotes = [];

    $: {
        console.log("SESSION STARTED?", sessionStarted);
        console.log("SESSION NOTES", sessionNotes);
        console.log("notes length", $notes.length);
        console.log("notes", $notes);
    }
</script>

<h2>add new notes for course</h2>

<Select bind:enabled={selectEnabled} bind:value={selectedCourse} selectId={"select-create"}/>
<div class="create-container">
    <div id="add-notes">
        <textarea bind:value={note} name="text-note" id="text-note" cols="50" rows="10" tabindex="0" title="Kirjoita muistiinpano tähän"></textarea>
        <span class="buttons-container">
            <!-- muistiinpanon tallennus -->
            <Button on:click={saveNote} text="Save" title="Tallenna muistiinpano"/>
            <!-- uusi sessio -->
            <Button on:click={() => sessionStarted = false} text="Back" title="Aloita uusi istunto"/>
        </span>
    </div>
    <div id="session-notes">
        {#if sessionStarted}
            {#each sessionNotes as note (note.id)}
                <pre>{note.text}</pre>
            {/each}
        {/if}
    </div>
</div>
<Footer/>

<style>
    div.create-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: 
                "add-notes"
                "session-notes";
        row-gap: 1em;
    }

    div#add-notes {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        grid-area: add-notes;
    }
    
    div#session-notes {
        display: grid;
        grid-area: session-notes; 
        row-gap: 1em;
        width: min(90%, 760px);
    }
    
    div#session-notes > pre {
        white-space: pre-wrap;
        padding: 1em;
        margin: 0;
        border-radius: 10px;
        border: 1px solid #000;
    }

    span.buttons-container {
        display: flex;
        flex-direction: row;
    }

    h2 {
        margin: 0 0 .5em 0;
        font-weight: 500;
        font-size: clamp(1.25em, calc(14px + 2vw), 3em);
        font-family: var(--title-font-family);
    }

    textarea#text-note {
        font-size: clamp(16px, calc(2rem + .5vw), 22px);
        border: 2px solid #000;
        width: min(90%, 500px);
        height: min(35vh, 310px);
    }

</style>