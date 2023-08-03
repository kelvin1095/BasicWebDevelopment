// Appending tasks to the list

const addTask = function () {
  addBox = document.getElementById("InputBox");
  newTask = addBox.value;

  toDoList = document.getElementById("AddedItems");
  appendTask = document.createElement("li");
  addedTask = `${newTask}`;
  //   addedTask = `${newTask} <button onclick="DeleteTask()" id="DeleteButton">Delete</button>`;
  appendTask.innerHTML = addedTask;
  toDoList.appendChild(appendTask);

  addBox.value = "";
};
