const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const tasks = require('./tasks');



let argv = yargs
    .command('add', 'Adds a task')
    .command('list', 'Lists all tasks')
     .help()
    .argv;
    

let argvCommands = argv._;

const command = argv._[0];

if (command === 'add'){

    argvCommands.shift();

    const argvCommandsToString = argvCommands.join(' ');

    if(argvCommands.length === 0){
        console.log('You must provide a task');
    }else {
        var task = tasks.addTask(argvCommandsToString);
        console.log('Task created');
        tasks.logTask(task);
    }
   
}else if(command === 'list'){
    var allNotes = tasks.getAll();
    if (allNotes.length > 0){
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach((note) => tasks.logNote(note));
    }else{
        console.log('No notes listed')
    }

}else if(command === 'read'){
    var note = tasks.getNote(argv.title);
    if (note){
        console.log('Note found');
        tasks.logNote(note);
    }else{
        console.log('Note not found');
    }

}else if(command === 'remove'){
    var noteRemoved = tasks.removeNote(argv.title);
    var message = (noteRemoved) ? 'Note was removed.' : 'Note not found';
    console.log(message);
    
}else{
    console.log('Command not recognized');
}




