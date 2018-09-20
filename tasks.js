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
  console.log(`task ${taskId} doesn't exist`);
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
var getAll = () => {
  return fetchTasks();
};

var removeTask = id => {
  var tasks = fetchTasks();
  if (tasks.length === 0) {
    return "empty";
  }
  //filter tasks, removing the one with the same id
  var filteredTasks = tasks.filter(task => task.id !== id);
  //save new tasks array
  saveTasks(filteredTasks);
  //check if a task was removed
  return tasks.length !== filteredTasks.length;
};

var checkExtraWords = (commands, message) => {
  if (commands.length >= 2) {
    console.log("///////////");
    console.log(message);
    console.log("///////////");
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

var getTaskId = commands => {
  commands.shift();
  return commands[0];
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
  console.log("Task saved.");
  console.log(`${taskId}. ${taskName}`);
};

module.exports = {
  addTask,
  getAll,
  removeTask,
  checkExtraWords,
  reorderList,
  getTaskId,
  editTask,
  warningNoTask
};
