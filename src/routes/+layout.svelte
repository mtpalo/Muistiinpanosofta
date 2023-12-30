<script>
// @ts-nocheck

    import { notes, courses } from "$lib/stores";

    export let data;

    if($courses.length == 0){
        courses.populate(data.courses);
        // reverse() -> muistiinpanot ajan mukaiseen järjestykseen (uusin ensimmäiseksi)
        notes.populate(data.notes.reverse());
        console.log("API notes", data.notes);
    }
</script>

<header>
    <nav>
        <ul>
            <li><a href="/" id="logo" title="NotesApp - muistiinpanosovellus">NotesApp</a></li>
        </ul>
    </nav>
</header>

<main class="centered">
    <div>
        <slot />
    </div>
</main>

<style>

    :root {
        --max-width: 1060px;
        --bg-color-primary: #3e3e3e;
        --primary-font-family: 'Montserrat', sans-serif;
        --title-font-family: 'Open Sans', sans-serif;
    }

    :global(body) {
        display: block;
        position: relative;
        width: min(86%, var(--max-width));
        min-height: 100vh;
        margin: 0 auto;
        padding: 0;
    }

    :global(h1::first-letter, h2::first-letter){
        text-transform: uppercase;
    }

    :global(pre) {
        font-size: clamp(12px, 1.25vw, 1.75em);
    }

    a#logo {
        font-family: var(--primary-font-family);
        font-size: clamp(3em, calc(3rem + 1vw), 3.5em);
        text-shadow: 2px 2px 4px var(--bg-color-primary);
        text-decoration: none;
        color: #000;
    }

    a#logo:hover {
        text-decoration: underline;
    }

    header {
        height: clamp(7vh, calc(1vh + 5rem), 30vh);
    }

    header > nav {
        margin: 1em 0;
    }

    header > nav ul {
        padding: 0;
    }

    .centered > * {
        max-width: 90%;
        margin: 5vh auto;
    }

    nav li {
        list-style-type: none;
    }

</style>