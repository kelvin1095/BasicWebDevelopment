// Creating an index to keep track of task number
var taskNumber = 0;

// Appending tasks to the list
const addTask = function () {
  addBox = document.getElementById("InputBox");
  newTask = addBox.value;

  if (newTask == "") {
    alert("Please enter a task");
    return;
  }

  toDoList = document.getElementById("AddedItems");
  appendTask = document.createElement("li");
  appendTask.setAttribute("id", "Task" + taskNumber);
  var addedTask = `
  <div class="task"}>
    <div class="addedTask">${newTask}</div> 
    <button onclick="doneTask(${taskNumber})" class="completeButton">Complete</button>
    <button onclick="deleteTask(${taskNumber})" class="deleteButton">Delete</button>
  </div>`;
  appendTask.innerHTML = addedTask;
  toDoList.appendChild(appendTask);

  addBox.value = "";
  taskNumber = taskNumber + 1;
};

// Delete task from the list
const deleteTask = function (task) {
  task = "Task" + task;
  document.getElementById(task).remove();
};

// Mark task as complete by adding a class tag and using css to grey out and strike through
const doneTask = function (task) {
  idName = "Task" + task;
  document.getElementById(idName).setAttribute("class", "completed");
  document.getElementById(idName).querySelector(".completeButton").removeAttribute("onClick");
  document.getElementById(idName).querySelector(".completeButton").setAttribute("onClick", `undoTask(${task})`);
  document.getElementById(idName).querySelector(".completeButton").innerHTML = "Undo";
};

// To-do: Modify the above to change the complete button to not complete
const undoTask = function (task) {
  idName = "Task" + task;
  document.getElementById(idName).removeAttribute("class");
  document.getElementById(idName).querySelector(".completeButton").removeAttribute("onClick");
  document.getElementById(idName).querySelector(".completeButton").setAttribute("onClick", `doneTask(${task})`);
  document.getElementById(idName).querySelector(".completeButton").innerHTML = "Complete";
};
