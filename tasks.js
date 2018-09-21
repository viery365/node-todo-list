const fs = require("fs");

const fetchTasks = () => {
  try {
    //if file already exists
    const tasksString = fs.readFileSync("tasks-db.json");
    return JSON.parse(tasksString);
  } catch (e) {
    //if there is no file yet
    return [];
  }
};

const reorderList = () => {
  const tasks = fetchTasks();

  if (tasks.length === 0) {
    return;
  } else {
    tasks.forEach((task, index) => {
      task.id = index + 1;
    });
  }

  saveTasks(tasks);
};

const logTask = (message, taskId, taskName) => {
  console.log(`Task ${message}`);
  console.log("---");
  console.log(`Id: ${taskId}`);
  console.log(`Task: ${taskName}`);
};

const saveTasks = tasks => {
  fs.writeFileSync("tasks-db.json", JSON.stringify(tasks));
};

const warningNoTasks = () => {
  console.log("You have no tasks.");
  console.log("Use 'node app.js add <name of the task>' to add a task.");
};

const warningNoTask = taskId => {
  console.log(`Task ${taskId} not found`);
  console.log("To see the tasks you have available use: node app.js list");
};

const addTask = task => {
  const tasks = fetchTasks();

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

const listTasks = () => {
  const allTasks = fetchTasks();
  if (allTasks.length > 0) {
    console.log(`You have ${allTasks.length} task(s):`);
    allTasks.forEach(task => {
      console.log(`${task.id}.`, task.task);
    });
  } else {
    warningNoTasks();
  }
};

const removeTask = taskId => {
  const tasks = fetchTasks();
  if (tasks.length === 0) {
    warningNoTasks();
    return;
  }

  const taskToRemove = tasks.find(task => {
    return task.id === taskId;
  });

  let taskName;

  if (taskToRemove) {
    taskName = taskToRemove.task;
  }

  //filter tasks, removing the one with the same id
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  //check if a task was removed
  if (tasks.length !== filteredTasks.length) {
    //save new tasks array
    saveTasks(filteredTasks);
    if (taskName.indexOf('"') > -1) {
      console.log(`Task ${taskId}: '${taskName}' was removed.`);
    } else {
      console.log(`Task ${taskId}: "${taskName}" was removed.`);
    }
    reorderList();
  } else {
    warningNoTask(taskId);
  }
};

const editTask = (taskId, taskName) => {
  const tasks = fetchTasks();
  if (tasks.length === 0) {
    warningNoTasks();
    return;
  }
  const task = tasks.find(task => {
    return task.id === taskId;
  });
  if (task === undefined) {
    warningNoTask(taskId);
    return undefined;
  }
  task.task = taskName;
  saveTasks(tasks);
};

module.exports = {
  addTask,
  listTasks,
  removeTask,
  editTask,
  warningNoTask,
  logTask
};
