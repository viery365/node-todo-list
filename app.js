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

const argv = yargs
  .command("add", "Adds a task", {
    name: nameOptions
  })
  .command("list", "Lists all tasks")
  .command("remove", "Remove task", {
    task: taskOptions
  })
  .command("edit", "Edit task", {
    task: taskOptions,
    name: nameOptions
  })
  .help().argv;

const command = process.argv[2];

if (command === "add") {
  const taskName = argv.name;
  const task = tasks.addTask(taskName);
  tasks.logTask("created", task.id, taskName);
} else if (command === "list") {
  tasks.listTasks();
} else if (command === "remove") {
  const taskId = argv.task;
  if (Number.isInteger(taskId) && taskId > 0) {
    tasks.removeTask(taskId);
  } else if (taskId <= 0) {
    tasks.warningNoTask(taskId);
  } else {
    console.log("You must provide the number of the task to remove.");
  }
} else if (command === "edit") {
  const taskId = argv.task;
  const taskName = argv.name;
  if (Number.isInteger(taskId) && taskId > 0) {
    const taskEdited = tasks.editTask(taskId, taskName);
    if (taskEdited !== undefined) {
      console.log("Task saved.");
      tasks.logTask("saved", taskId, taskName);
    }
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
