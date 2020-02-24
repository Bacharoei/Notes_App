
const valid = require('validator');
const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes');
const chalk = require('chalk');

// console.log(process.argv)


//customize yargs version
yargs.version('1.1.0')

// create add command 
yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },

        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv) {
       notes.addNote(argv.title, argv.body)
    }

})

// create remove command 
yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'Listing the notes',
    handler() {
        notes.getNotes();
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: "Reading the note",
    builder: {
        title: {
            describe: " Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
       notes.readNote(argv.title);
    }
})

//console.log(yargs.argv)
yargs.parse()