const fs = require("fs");

var fetchTasks = () => {
  try {
    //if file already exists
    var tasksString = fs.readFileSync("tasks-db.json");
    return JSON.parse(tasksString);
  } catch (e) {
    //if there is no file yet
    return [];
  }
};

var saveTasks = tasks => {
  fs.writeFileSync("tasks-db.json", JSON.stringify(tasks));
};

var warningNoTasks = () => {
  console.log("You have no tasks.");
  console.log("Use 'node app.js add <name of the task>' to add a task.");
};

var warningNoTask = taskId => {
  console.log(`task ${taskId} not found`);
  console.log("To see the tasks you have available use: node app.js list");
};

var addTask = task => {
  var tasks = fetchTasks();

  task = {
    task
  };

  if (tasks.length === 0) {
    task.id = 1;
  } else {
    const lastTask = tasks[tasks.length - 1];
    task.id = lastTask.id + 1;
  }

  tasks.push(task);
  saveTasks(tasks);

  return task;
};
var listTasks = () => {
  let allTasks = fetchTasks();
  if (allTasks.length > 0) {
    console.log(`You have ${allTasks.length} task(s):`);
    allTasks.forEach(task => {
      console.log(`${task.id}.`, task.task);
    });
  } else {
    warningNoTasks();
  }
};

var removeTask = taskId => {
  var tasks = fetchTasks();
  if (tasks.length === 0) {
    warningNoTasks();
  }
  //filter tasks, removing the one with the same id
  var filteredTasks = tasks.filter(task => task.id !== taskId);
  //check if a task was removed
  if (tasks.length !== filteredTasks.length) {
    //save new tasks array
    saveTasks(filteredTasks);
    console.log(`Task ${taskId} was removed.`);
    reorderList();
  } else {
    warningNoTask(taskId);
  }
};

var reorderList = () => {
  var tasks = fetchTasks();

  if (tasks.length === 0) {
    return;
  } else {
    tasks.forEach((task, index) => {
      task.id = index + 1;
    });
  }

  saveTasks(tasks);
};

var editTask = (taskId, taskName) => {
  var tasks = fetchTasks();
  if (tasks.length === 0) {
    warningNoTasks();
    return;
  }
  let task = tasks.find(task => {
    return task.id === taskId;
  });
  if (task === undefined) {
    warningNoTask(taskId);
    return;
  }
  task.task = taskName;
  saveTasks(tasks);
};

let logTask = (message, taskId, taskName) => {
  console.log(`Task ${message}`);
  console.log("---");
  console.log(`Id: ${taskId}`);
  console.log(`Task: ${taskName}`);
};

module.exports = {
  addTask,
  listTasks,
  removeTask,
  reorderList,
  editTask,
  warningNoTask,
  logTask
};
