const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs');
const notes = require('./notes.js');
const { argv } = require('process');

//customize the yargs version 
yargs.version('1.1.0')

yargs.command({
    command : 'add' ,
    describe : 'Add a new note',
    builder : {
        title: {
            describe: 'note title',
            demandOption : true ,
            type : 'string'
        },
        body: {
            describe: 'note body',
            demandOption : true ,
            type : 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    } 
})

//create a remove command 
yargs.command({
    command : 'remove' ,
    describe : 'remove a new note',
    builder : {
        title: {
            describe: 'note title',
            demandOption : true ,
            type : 'string'
        },
        body: {
            describe: 'note body',
            demandOption : false ,
            type : 'string'
        }
    },
    handler(argv) {
        console.log('removing note titled ' + argv.title + " !")
        notes.removeNote(argv.title)
    } 
})

yargs.command({
    command : 'list' ,
    describe : 'list notes',
    handler() {
        console.log(chalk.green.inverse('Listing your notes !'))
        notes.listNotes()
    } 
})

yargs.command({
    command : 'read' ,
    describe : 'read note',
    builder : {
        title: {
            describe: 'note title',
            demandOption : true ,
            type : 'string'
        },
        body: {
            describe: 'note body',
            demandOption : false ,
            type : 'string'
        }
    },
    handler(argv) {
        console.log('Finding note!')
        notes.read(argv.title)
    } 
})



yargs.parse()
