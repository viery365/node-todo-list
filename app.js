const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const tasks = require("./tasks");

let argv = yargs
  .command("add", "Adds a task")
  .command("list", "Lists all tasks")
  .command("remove", "Remove task")
  .help().argv;

let commands = argv._;

const command = process.argv[2];

if (command === "add") {
  commands.shift();

  const commandsToString = commands.join(" ");

  if (commands.length === 0) {
    console.log("You must provide a task.");
    console.log("ex: 'node app.js task first task'");
  } else {
    let task = tasks.addTask(commandsToString);
    console.log("Task created");
    console.log("---");
    console.log(`Id: ${task.id}`);
    console.log(`Task: ${task.task}`);
  }
} else if (command === "list") {
  tasks.checkExtraWords(
    commands,
    "Next time just use 'list', it will be enough"
  );
  var allTasks = tasks.getAll();
  if (allTasks.length > 0) {
    console.log(`Printing ${allTasks.length} task(s).`);
    allTasks.forEach(task => {
      console.log(`${task.id}.`, task.task);
    });
  } else {
    console.log("You have 0 tasks");
  }
} else if (command === "remove") {
  commands.shift();
  const taskId = commands[0];
  if (Number.isInteger(taskId) && taskId > 0) {
    tasks.checkExtraWords(
      commands,
      "Next time just provide the number of the task, it will be enough"
    );
    const taskRemoved = tasks.removeTask(taskId);
    if (taskRemoved && taskRemoved !== "empty") {
      console.log(`Task ${taskId} was removed.`);
      tasks.reorderList();
    } else if (taskRemoved === "empty") {
      console.log("You have no tasks.");
      console.log("Use 'node app.js add <name of the task>' to add a task.");
    } else {
      console.log("Task not found. Try again.");
      console.log("Use 'node app.js list' to check your tasks.");
    }
  } else {
    console.log("You must provide the number of the task to remove.");
  }
} else {
  console.log("Command not recognized");
}
