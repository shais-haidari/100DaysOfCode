let taskCount = 0
let editMode = false
const todoInpt = document.getElementById("todo-input");
const modifyTask = document.getElementById("modifyTask");


function addTask() {
    ++taskCount;

    const li = document.createElement("li");
    li.id = "task" + taskCount;
    document.getElementById("tasks").appendChild(li);

    const input = document.createElement("Input");
    input.id = "input" + taskCount;
    input.type = "checkbox";
    li.appendChild(input);

    const span = document.createElement("span");
    span.id = "span" + taskCount;
    span.innerHTML = todoInpt.value;
    li.appendChild(span);

    const actions = document.createElement("div");
    actions.id = "action" + taskCount;
    actions.className = "actions";

    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.id = "edit-btn" + taskCount;
    editButton.innerHTML = "Edit";
    editButton.onclick = () => editTask(span)
    actions.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "remove-btn";
    deleteButton.id = "delete" + taskCount;
    const confirmMessage = document.getElementById('confirmMessage');
    deleteButton.onclick = () => confirmMessage.style.display = "flex"
    deleteButton.innerHTML = "Remove";

    const confirmDelete = document.getElementById('confirmRemove');
    confirmDelete.onclick = () => {
        deleteTask(li)
        confirmMessage.style.display = "none"
    };


    
   


    actions.appendChild(deleteButton);
    li.appendChild(actions);
    todoInpt.value = ""
}

function deleteTask(li) {
    if (li) {
        li.remove();
    }
}

function editTask(span) {
    const value = span.innerText
    const id = span.id;
    todoInpt.value = value
    modifyTask.innerHTML = "Change"
    modifyTask.style.backgroundColor = "orange"
    modifyTask.onclick = () => updateText(id, todoInpt.value)


}

function updateText(id, newValue) {
    console.log(id)
    console.log(newValue)
    document.getElementById(id).innerHTML = newValue;
    todoInpt.value = ""
    modifyTask.innerHTML = "Add Task"
    modifyTask.style.backgroundColor = "blue"
    modifyTask.onclick = () => addTask()
}

