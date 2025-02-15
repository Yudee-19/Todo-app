let tasks = [];
let idcount = 1;

// function to save tasks in localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks))

}

// function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => renderTask(task))
        idcount = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    }
}

// Call this function when the page loads
window.onload = loadTasksFromLocalStorage;

//function to render each task
function renderTask(task) {

    // Create a new task div
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "todo-" + task.id);
    newDiv.setAttribute("class", "tasks");

    // Create a checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "task-checkbox");
    checkbox.setAttribute("onchange", `toggleTaskCompletion(${task.id})`);
    checkbox.checked = task.completed; // Set checkbox state based on task completion

    // Create a paragraph for the task text
    const newTaskEl = document.createElement("p");
    newTaskEl.innerHTML = task.text;
    newTaskEl.classList.add(task.completed ? "completed" : "notcompleted"); // Add the appropriate class

    // Create a div for buttons
    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "taskButtons");

    // Create the Edit button
    const editButton = document.createElement("button");
    editButton.setAttribute("class", "editButton btn btn-warning");
    editButton.setAttribute("onclick", `editTask(${task.id})`);
    editButton.innerHTML = "Edit";

    // Create the Delete button
    const delButton = document.createElement("button");
    delButton.setAttribute("class", "deleteButton btn btn-danger");
    delButton.innerHTML = "Delete";
    delButton.setAttribute("onclick", `deleteTask("${task.id}")`);

    // Append the checkbox, task text, and buttons to the task div
    newDiv.appendChild(checkbox);
    newDiv.appendChild(newTaskEl);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(delButton);
    newDiv.appendChild(buttonDiv);

    // Append the task div to the task container
    document.getElementById("taskbox").appendChild(newDiv);

}


// Event listener for the Enter key
document.querySelector("input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask(); // Call the addTask function when Enter is pressed
    }
});

//function to add new task
function addTask() {
    const task = document.querySelector("input").value
    if (task.trim() === "") return;

    //making a new task object
    const newTask = {
        text: task,
        id: idcount,
        completed: false
    }

    //pushing the new task into the global array
    tasks.push(newTask);

    //saving the updated array to local storage
    saveTasksToLocalStorage();

    //rendering the new task
    renderTask(newTask);

    //Clearing the input box
    document.querySelector("input").value = ""

    //incresing the idcount
    idcount++;


}

//function to delete a task
function deleteTask(id) {
    id = Number(id);

    //removing the task from global array
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage();

    //removing the task from the DOM
    const delItem = document.getElementById("todo-" + id);
    delItem.parentNode.removeChild(delItem)
}

//function to edit task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (!task) return;

    // Create an input box to edit the task
    const editBox = document.createElement("input");
    editBox.setAttribute("class", `editBox-${id}`);
    editBox.setAttribute("type", "text");
    editBox.value = task.text;

    // Create a Save button
    const saveBtn = document.createElement('button');
    saveBtn.setAttribute("class", `saveButton btn btn-success`);
    saveBtn.setAttribute("onclick", `saveTask(${id})`);
    saveBtn.innerHTML = `Save`;

    // Replace the task content with the input box and Save button
    const taskDiv = document.getElementById(`todo-${id}`);
    taskDiv.innerHTML = "";
    taskDiv.appendChild(editBox);
    taskDiv.appendChild(saveBtn);



}

//funciton to save the edited task
function saveTask(id) {
    const updatedTaskText = document.querySelector(`.editBox-${id}`).value.trim();
    if (updatedTaskText === "") return; // Do nothing if the task is empty

    //update the task text in the array
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.text = updatedTaskText;
    }

    saveTasksToLocalStorage();

    // Re-render the task
    const taskDiv = document.getElementById(`todo-${id}`);
    taskDiv.innerHTML = "";
    // Create a checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "task-checkbox");
    checkbox.setAttribute("onchange", `toggleTaskCompletion(${id})`);
    checkbox.checked = task.completed; // Set checkbox state based on task completion

    // Create a paragraph for the updated task text
    const newTaskEl = document.createElement("p");
    newTaskEl.innerHTML = updatedTaskText;
    newTaskEl.classList.add(task.completed ? "completed" : "notcompleted"); // Add the appropriate class

    // Create a div for buttons
    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "taskButtons");

    // Create the Edit button
    const editButton = document.createElement("button");
    editButton.setAttribute("class", "editButton btn btn-warning");
    editButton.setAttribute("onclick", `editTask(${id})`);
    editButton.innerHTML = "Edit";

    // Create the Delete button
    const delButton = document.createElement("button");
    delButton.setAttribute("class", "deleteButton btn btn-danger");
    delButton.innerHTML = "Delete";
    delButton.setAttribute("onclick", `deleteTask("${id}")`);

    // Append the checkbox, task text, and buttons to the task container
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(newTaskEl);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(delButton);
    taskDiv.appendChild(buttonDiv);

}


function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id)
    if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage();


        // Update the task's appearance using classes
        const taskText = document.querySelector(`#todo-${id} p`);
        if (task.completed) {
            taskText.classList.remove("notcompleted");
            taskText.classList.add("completed");
        } else {
            taskText.classList.remove("completed");
            taskText.classList.add("notcompleted");
        }
    }
    saveTasksToLocalStorage();

}

function clearTasks() {
    tasks = [];
    idcount = 1;
    saveTasksToLocalStorage();
    document.getElementById("taskbox").innerHTML = "";
}