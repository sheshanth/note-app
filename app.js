console.log('Starting app.js ')

//build in packages and npm packages
const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

//custom exports
const notes = require('./notes')

//title option for yargs
const titleOption = {
    describe: 'title of note',
    demand: true,
    alias: 't'
}

//body option for yargs
const bodyOption = {
    describe: 'body of note',
    demand: true,
    alias: 'b'
}

//Advanced yargs for help and require guides
var args = yargs
    .command('add', 'add a note', {             //for add command 
        title: titleOption,
        body: bodyOption
    })
    .command('list', 'lst of notes')            //for list command
    .command('read', 'to read a note', {        //for read command
        title: titleOption
    })
    .command('remove', 'to remove a note', {    //for remove command
        title: titleOption
    })
    .help()
    .argv;

//for manuplation such as add, remove, list and read commands
var command = args._[0];

if (command === 'add') {                        //add 
    let note = notes.addNote(args.title, args.body)
    if (note) {
        console.log(`Note created`);
        notes.logNote(note)
    } else {
        console.log(`Note title take`);
    }
} else if (command === 'list') {                //list
    let allNotes = notes.getAll()
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(element => {
        notes.logNote(element)
    });
} else if (command === 'read') {                //read
    let note = notes.getNote(args.title)
    if (note) {
        console.log('note found');
        notes.logNote(note)
    }
    else {
        console.log(`note not found`);
    }
} else if (command === 'remove') {              //remove
    let noteRemoved = notes.removeNote(args.title)
    let message = noteRemoved ? 'Note was removed' : 'Note not found'
    console.log(message);
} else if (command === undefined) {             //if command not typed
    console.log(`No command found.\nEnter a command`);
} else {                                        //if no command if typed
    console.log(`Command not recognized`);
}