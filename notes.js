console.log(`Starting notes.js`)

const fs = require('fs')

//Featch notes from the JSON file
let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json')
        return JSON.parse(notesString)
    } catch (error) {
        return []
    }
}

//Save note to JSON file 
let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))

}

//Add a new note
let addNote = (title, body) => {

    let notes = fetchNotes()

    let note = {
        title,
        body
    }

    let duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push(note)
        saveNotes(notes)
        return note
    }

}

//List all notes
let getAll = () => {
    return fetchNotes()
}

//Read requested note
let getNote = (title) => {
    let notes = fetchNotes()
    let filteredNotes = notes.filter((note) => note.title === title)
    return filteredNotes[0]
}

//Remove note
let removeNote = (title) => {
    let notes = fetchNotes()
    let removedNotes = notes.filter((note) => note.title !== title)
    saveNotes(removedNotes)
    return notes.length !== removedNotes.length
}

//Log title and body of note
let logNote = (note) => {
    console.log(`----`)
    console.log(`title: ${note.title} `)
    console.log(`body: ${note.body} `)
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}