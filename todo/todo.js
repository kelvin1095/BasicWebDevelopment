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
  var addedTask = `${newTask}`;
  //   addedTask = `${newTask} <button onclick="DeleteTask()" id="DeleteButton">Delete</button>`;
  appendTask.innerHTML = addedTask;
  toDoList.appendChild(appendTask);

  addBox.value = "";
};
