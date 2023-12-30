<script>
    import NavButton from "./NavButton.svelte";
    import { courses } from "$lib/stores";
    import Footer from "./Footer.svelte";

    // muistiinpanoja ei voi luoda, jos kursseja ei ole
    let sites = [
        {
            linkName: "Create notes for class",
            href: $courses.length > 0 ? "create" : "",
            el_class: $courses.length > 0 ? "enabled_link" : "",
            title: $courses.length > 0 ? "Luo muistiinpano" : "Luo kurssi ensin"
        },
        {
            linkName: "Add Courses",
            href: "add",
            title: "Lisää uusi kurssi"
        },
        {
            linkName: "List Notes",
            href: "list",
            title: "Listaa muistiinpanoja"
        } 
    ];

</script>

<nav>
    {#each sites as site}
        <span>
            <NavButton {...site}/>
        </span>
    {/each}
</nav>

<Footer />

<style>
    nav {
        display: flex;
        justify-content: space-around;
    }
    
    @media (max-width: 769px) {
        nav {
            min-height: 50vh;
            flex-direction: column;
        }
    }

</style>