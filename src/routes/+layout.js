// @ts-nocheck
// API url
const notesAPI = 'https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes'; 
const coursesAPI = 'https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses'; 

export async function load({fetch}){
    // muistiinpanot
    const resNotes = await fetch(notesAPI);
    const notes = await resNotes.json();
    
    // kurssit
    const resCourses = await fetch(coursesAPI);
    const courses = await resCourses.json();

    return {notes, courses}
}