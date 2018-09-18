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
var getNote = title => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0];
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

module.exports = {
  addTask,
  getAll,
  getNote,
  removeTask,
  checkExtraWords,
  reorderList
};
