const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    const notes = loadNotes()

    notes.forEach(note => {
        console.log(chalk.cyanBright.bold.inverse('Title: ' )+ note.title)
        console.log(chalk.bold.magenta.inverse('\tBody: ') + note.body)
    });
}

const read = (title) =>{
    const notes = loadNotes()

    const found = notes.find((note) =>
        note.title === title
    )

    if(found){
        console.log(chalk.green.inverse(' Note found !'))
        console.log(chalk.cyanBright.bold.inverse('Title: ' )+ found.title)
        console.log(chalk.bold.magenta.inverse('\tBody: ') + found.body)    
    } else {
        console.log(chalk.red.inverse(' Note not found !'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // get the duplicate
    const duplicateNotes = notes.find((note) =>
        note.title === title  
    )
    // if duplicateNotes not found 
    if (!duplicateNotes){
        notes.push(
            {
               title : title,
               body :  body 
            }
        )
        saveNotes(notes)
        console.log(chalk.green.inverse('Saved Note'))
    } else {
        console.log(chalk.red.inverse('Note title already taken'))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notestokeep = notes.filter((note) =>
        note.title !== title
    )
    
    saveNotes(notestokeep)
    
    if(notes.length > notestokeep.length){
        console.log(chalk.red.inverse('Removed Note'))
    } else {
        console.log(chalk.blue.inverse('No note found'))
    }
    
}

const loadNotes = () => {
    try {
        const dataBuffer= fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    read : read
} 