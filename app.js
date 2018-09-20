const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const tasks = require("./tasks");

const nameOptions = {
  alias: "n",
  demandOption: true
};

const taskOptions = {
  alias: "t",
  demandOption: true
};

let argv = yargs
  .command("add", "Adds a task", {
    name: nameOptions
  })
  .command("list", "Lists all tasks")
  .command("remove", "Remove task")
  .command("edit", "Edit task", {
    task: taskOptions,
    name: nameOptions
  })
  .help().argv;

let commands = argv._;

const command = process.argv[2];

if (command === "add") {
  let taskName = argv.name;
  let task = tasks.addTask(taskName);
  console.log("Task created");
  console.log("---");
  console.log(`Id: ${task.id}`);
  console.log(`Task: ${taskName}`);
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
  let taskId = tasks.getTaskId(commands);
  if (Number.isInteger(taskId) && taskId > 0) {
    tasks.checkExtraWords(
      commands,
      "Next time just provide the number of the task, it will be enough"
    );
    const taskRemoved = tasks.removeTask(taskId);
    if (taskRemoved && taskRemoved !== "empty") {
      console.log(`Task ${taskId} was removed.`);
      tasks.reorderList();
    } else {
      console.log("Task not found. Try again.");
      console.log("Use 'node app.js list' to check your tasks.");
    }
  } else {
    console.log("You must provide the number of the task to remove.");
  }
} else if (command === "edit") {
  const taskId = argv.task;
  const taskName = argv.name;
  if (Number.isInteger(taskId) && taskId > 0) {
    tasks.editTask(taskId, taskName);
    console.log("Task saved.");
    console.log(`${taskId}. ${taskName}`);
  } else if (taskId <= 0) {
    tasks.warningNoTask(taskId);
  } else {
    console.log("Task must be a number");
  }
} else {
  console.log("Command not recognized");
  console.log(
    "See the list of comands and options available: node app.js --help"
  );
}
