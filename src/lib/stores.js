// @ts-nocheck
import { writable } from "svelte/store";

function createNotes(){
    const {subscribe, set, update} = writable([]);
    // lisätään muistiinpanon listan ensimmäiseksi
    const add_note = (note) => update((notes) => [note, ...notes]);
    const remove_note = (id) => update((notes) => {
        // huomataan, että notes-taulukon indeksit ovat käänteisiä muistiinpanojen (note) id-arvoihin nähden
        /**
         * indeksi id
         * 0        3
         * 1        2
         * 2        1
         * 3        0
         */
        let ind = 9999; // voi olla mikä luku vain
        for(let i = 0; i < notes.length; i++){
            // id-arvoa vastaava indeksi löytyy varmasti
            if(notes[i].id == id){
                ind = i;
                break;
            }
        }
        // poistetaan muistiinpano id-arvon perusteella
        notes = notes.filter(n => n.id != id);
        /**
         * tähän listaan indeksiä pienemmät
         * näiden muistiinpanojen id-arvoa tulee pienentää yhdellä
         * tämä lista voi olla tyhjä, jos satutaan poistamaan viimeksi lisätty (uusin) muistiinpano (pienin indeksi)
         */
        let notesMod1 = notes.slice(0, ind);
        /**
         * tähän listaan indeksiä suuremmat
         * tämä lista voi olla tyhjä, jos satutaan poistamaan ensimmäiseksi lisätty (vanhin) muistiinpano (suurin indeksi)
        */
       let notesMod2 = notes.slice(ind, notes.length);
        /**
         * pienennetään id-arvoja yhdellä, jotta ei tule vastaan tilanteita, joissa esim. id-arvot kasvavat: 0, 1, 3, 3
         * tilanne tulee vastaan jos ensin poistetaan (id: 2) ja sitten lisätään (id: 3, listan pituudesta id-arvo)
         * tässä tapauksessa each-silmukasta tulee virhe list-näkymässä -> duplicate keys
         * huom. vain poistetun muistiinpanon id-arvoa suurempia id-arvoja pienennetään yhdellä
        */
        for(let note of notesMod1){
            note.id--;
        }
        // liitetään listat yhdeksi listaksi
        notes = [...notesMod1, ...notesMod2];
        console.log("store notes", notes);
        return notes;
    });

    return {
        subscribe,
        add: add_note,
        remove: remove_note,
        reset: () => set([]),
        populate: (notes) => set(notes)
    }
}

export const notes = createNotes();

function createCourses(){
    const {subscribe, set, update} = writable([]);
    // lisätään kurssi listan viimeiseksi
    const add_course = (course) => update((courses) => [...courses, course])

    return {
        subscribe,
        add: add_course,
        reset: () => set([]),
        populate: (courses) => set(courses)
    }
}

export const courses = createCourses();

