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

var saveTask = task => {
  fs.writeFileSync("tasks-db.json", JSON.stringify(task));
};

var addTask = task => {
  var tasks = fetchTasks();

  var task = {
    task
  };

  tasks.push(task);
  saveTask(tasks);
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
var removeNote = title => {
  //fetch notes
  var notes = fetchNotes();
  //filter notes, removing the one with the title of the argument
  var filteredNotes = notes.filter(note => note.title !== title);
  //save new notes array
  saveNotes(filteredNotes);

  //check if a note was removed
  return notes.length !== filteredNotes.length;
};

module.exports = {
  addTask,
  getAll,
  getNote,
  removeNote
};
