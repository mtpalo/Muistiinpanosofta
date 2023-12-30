<script>
// @ts-nocheck

    import Button from "../Button.svelte";
    import { courses } from "$lib/stores";
    import Footer from "../Footer.svelte";

    let courseName = "", msgText = "";
    let warning = false, success = false, exists = undefined;

    // viestit käyttäjälle
    const infoMsg = {
        'exists': () => `Kurssi '${courseName}' on jo olemassa!`,
        'added': (id) => `opintojakso '${courseName}' lisätty id:llä ${id}`,
        'empty': () => "Kurssin nimi ei voi olla tyhjä arvo!",
    }

    function addCourse(){
        if(courseName.length > 0){
            courseName = courseName.toLowerCase();
            warning = false;
            // onko annettua nimeä vastaava kurssi jo olemassa, jos ei ole find-metodi palauttaa undefined
            exists = $courses.find(course => course.name == courseName);

            if(exists != undefined) warning = true;

            if(warning){
                // kurssin nimi on jo olemassa
                msgText = infoMsg.exists();
            }
            else {
                // kurssin id kurssien lukumäärän perusteella
                let name = courseName, id = $courses.length;
                let newCourse = {
                    id,
                    name
                }
                // store - lisätään kurssi
                courses.add(newCourse);
                msgText = infoMsg.added(id);
                // tyhjennetään kenttä onnistuneen lisäyksen jälkeen
                courseName = "";
            } 
        } else {
            // annettu tyhjä kurssin nimi-kenttä
            msgText = infoMsg.empty();
            warning = true;
        }
    }

    // kun warning-arvo muuttuu -> success-arvo on false, kun warning on true (ja toisinpäin)
    $: success = !warning
    // input-kentässä enter-painallus -> kurssin lisäystoiminto
    function checkEnter({key}){
        if(key == 'Enter') addCourse();
    }

</script>

<div>
    <span>
        <label for="course-name">Add course</label>
        <input placeholder="Course name" type="text" name="course-name" id="course-name" on:keydown={checkEnter} bind:value={courseName} tabindex="0">
        <Button on:click={() => addCourse()} text="Add" />
        {#if (msgText.length > 0)}
            <p id={success ? "course-success" : "course-warning"}>{msgText}</p>
        {/if}
    </span>
    <Footer />
</div>

<style>
    div > span {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: clamp(0.5em, 5vh,3em);
    }

    label {
        font-family: var(--primary-font-family);
        font-size: clamp(1em, calc(1rem + 3vw), 2em);
        text-align: center;
    }

    input {
        font-size: clamp(1em, calc(1rem + 1vw), 6vw);
        width: calc(12em + 1vw);
        line-height: 2em;
        text-align: center;
        border-radius: 200px;
        border: 2px solid #000;
    }

    input:focus {
        box-shadow: 3px 3px 5px var(--bg-color-primary);
    }

    p {
        font-size: clamp(1em, 5vw, 2em);
        max-width: calc(100% - 7rem);
        margin: min(3vw, 20px) auto;
        border-radius: 50px;
        padding: min(6vw, 20px);
    }

    p#course-success {
        border: 2px solid #0f0;
    }

    p#course-warning {
        border: 2px solid #f00;
    }

</style>