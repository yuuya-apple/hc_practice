const addTask = document.getElementById("add-task");

let index = 0;

addTask.addEventListener(
  "click",
  () => {
    const txt = document.getElementById("text-box");

    const newContent = document.createElement("li");
    newContent.setAttribute("id", `task${index}`);

    newContent.appendChild(createCheckBox(`task${index}`));
    newContent.appendChild(document.createTextNode(txt.value));
    newContent.appendChild(createEditButton(`task${index}`));
    newContent.appendChild(createDeleteButton(`task${index}`));

    const ul = document.getElementById("tasks");
    ul.appendChild(newContent);

    updateTaskSize();
    index++;
  },
  false
);

function deleteTask(ele) {

  if(!window.confirm("本当によろしいですか？")){
    return;
  }

  const ul = document.getElementById("tasks");
  const li = document.getElementById(ele.getAttribute("class"));
  ul.removeChild(li);

  updateTaskSize();
}

function editTask(ele) {
  const className = ele.getAttribute("class");
  const task = document.getElementById(ele.getAttribute("class"));

  const editInput = document.createElement("input");
  editInput.setAttribute("type", "text");
  editInput.setAttribute("value", task.outerText);
  editInput.setAttribute("class", className);

  const updateButton = document.createElement("input");
  updateButton.setAttribute("type", "button");
  updateButton.setAttribute("value", "保存");
  updateButton.setAttribute("class", className);
  updateButton.setAttribute("onclick", "updateTask(this)");

  while (task.firstChild) {
    task.removeChild(task.firstChild);
  }

  task.appendChild(editInput);
  task.appendChild(updateButton);
}

function updateTask(ele){
  const className = ele.getAttribute("class");
  const task = document.getElementById(className);

  const txt = task.firstChild.value;

  while (task.firstChild) {
    task.removeChild(task.firstChild);
  }

  task.appendChild(createCheckBox(className));
  task.appendChild(document.createTextNode(txt));
  task.appendChild(createEditButton(className));
  task.appendChild(createDeleteButton(className));

  updateTaskSize();
}

function createDeleteButton(className){

  const deleteButton = document.createElement("input");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("value", "削除");
  deleteButton.setAttribute("class", className);
  deleteButton.setAttribute("onclick", "deleteTask(this)");

  return deleteButton;
}

function createEditButton(className) {
  const editButton = document.createElement("input");
  editButton.setAttribute("type", "button");
  editButton.setAttribute("value", "編集");
  editButton.setAttribute("class", className);
  editButton.setAttribute("onclick", "editTask(this)");

  return editButton;
}

function createCheckBox(className) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("class", className);
  checkBox.setAttribute("onclick", "updateTaskSize()");

  return checkBox;
}

function updateTaskSize(){
  const taskSizeElement = document.getElementById("task-size");
  const compTaskSizeElement = document.getElementById("comp-task-size");
  const umCompTaskSizeElement = document.getElementById("um-comp-task-size");


  const tasks = Array.prototype.slice.call(document.getElementById("tasks").children);

  const taskSize = tasks.length;
  const compTaskSize = tasks.filter((task) => task.firstChild.checked).length;
  const umCompTaskSize = taskSize - compTaskSize;

  taskSizeElement.innerText = `全てのタスク：${taskSize}`;
  compTaskSizeElement.innerText = `完了済み：${compTaskSize}`;
  umCompTaskSizeElement.innerText = `未完了：${umCompTaskSize}`;
}