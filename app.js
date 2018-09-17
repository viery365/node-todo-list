const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const tasks = require('./tasks');

const commandsDesc = {
    add: 'Adds a task',
    list: 'Lists all tasks'
};

const commands = Object.keys(commandsDesc);
const descs = Object.values(commandsDesc);

const argv = yargs
    .command(commands[0], descs[0])
    .command(commands[1], descs[1])
    .help()
    .argv;

let argvArray = argv._;

const command = argv._[0];

if (command === 'add'){

     argvArray.shift();
     
     var findOne = function (haystack, arr) {
        return arr.some(function (v) {
            return haystack.indexOf(v) >= 0;
        });
    };
    // //{ _: ['read', 'a', 'book' ],...

    // console.log(listOfCommands);

    if(argv._[1] === undefined){
        console.log('You must provide a task');
    }else {
        var task = tasks.addTask(argv._[1]);

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




