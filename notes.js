const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    const notes = loadNotes()
    const notesList = notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title )
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)

    }else {
        console.log(chalk.red.inverse("note not found"))

    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter( (note) => note.title === title)
    const dupNote = notes.find((note) => note.title === title)
    if(!dupNote){
        notes.push({
            title,
            body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("new note added"))
    } else {
        console.log(chalk.red.inverse("Note title taken"));
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length) {
       console.log(chalk.green.inverse("deleted")); 
       saveNotes(notesToKeep);
    }else {
        console.log(chalk.red.inverse("no note found!"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e) {
        return []
    }
}

 module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}