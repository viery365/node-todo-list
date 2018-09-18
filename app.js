const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const tasks = require("./tasks");

let argv = yargs
  .command("add", "Adds a task")
  .command("list", "Lists all tasks")
  .command("read", "Read task")
  .help().argv;

let argvCommands = argv._;

const command = process.argv[2];

if (command === "add") {
  argvCommands.shift();

  const argvCommandsToString = argvCommands.join(" ");

  if (argvCommands.length === 0) {
    console.log("You must provide a task");
  } else {
    var task = tasks.addTask(argvCommandsToString);
    console.log("Task created");
    console.log("---");
    console.log(`Task: ${task.task}`);
  }
} else if (command === "list") {
  if (argvCommands.length >= 2) {
    console.log("///////////");
    console.log("Next time just use 'list', it will be enough");
    console.log("///////////");
  }
  var allTasks = tasks.getAll();
  if (allTasks.length > 0) {
    console.log(`Printing ${allTasks.length} task(s).`);
    allTasks.forEach(task => {
      console.log(task.task);
    });
  } else {
    console.log("You have 0 tasks");
  }
} else if (command === "read") {
  var note = tasks.getNote(argv.title);
  if (note) {
    console.log("Note found");
    tasks.logNote(note);
  } else {
    console.log("Note not found");
  }
} else if (command === "remove") {
  var noteRemoved = tasks.removeNote(argv.title);
  var message = noteRemoved ? "Note was removed." : "Note not found";
  console.log(message);
} else {
  console.log("Command not recognized");
}
