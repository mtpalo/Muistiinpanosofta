
<script>
// @ts-nocheck

    import {courses} from '$lib/stores.js';

    export let text = undefined;
    export let timestamp = undefined;
    export let course = undefined;

    // aika eri muotoon alkuperäisestä ("2022-11-22 08:23:12") -> lopulta muotoon day.month.year
    let t = timestamp.split(" ")[0].split("-");

    // haetaan kurssia vastaava id (ei siis muistaanpanon id)
    let [c] = $courses.filter((c) => c.name == course.name);
    // nimetään id-ominaisuus uudelleen (tässä näkymässä) -> courseID
    let {id: courseID} = c;

</script>

<div class="note-container">
    <!-- aika muotoon day.month.year -->
    <p>{`${t[2]}.${t[1]}.${t[0]}`} {course.name} (id {courseID})</p>
    <div class="note">
        <pre>{text}</pre>
        <!-- delete-painikkeen paikka -->
        <slot />
    </div>
</div>

<style>
    div.note-container {
        max-width: max(70%, 20em);
        margin-top: min(5vh, 3em);
    }

    div > div.note {
        border: 2px solid #000;
        border-radius: 10px;
        padding: min(1vw, 1em) 2.5em 2.5em 12px;
        position: relative;
    }

    div > pre {
        white-space: pre-wrap;
        padding: 1.5em 1em 0 0;
        margin: 0;
        height: 100%;
    }

</style>